// services/WorkflowService.ts

import { BaseService } from "./BaseService";
import { MapperEditSchema, PipelineCreatePayload, Result } from "../models";
import { JobsService } from "./JobsService";
import { WorkshopService } from "./WorkshopService";
import { PipelineService } from "./PipelineService";
import { ResultsService } from "./ResultsService";
import { JobExecutionResponse } from "../models/workflows/JobExecutionResponse";
import { ModelTypeMap } from "../types/ModelTypeMap";
import { PaginatedResponse } from "../types/pagination";
import { CreateAndRunJobResponse } from "../models/misc/CreateAndRunJobResponse";

/**
 * Service class for orchestrating workflows involving method calls across services
 * For workflows involving a single service, see the Workflows methods in the service directly.
 */
export class WorkflowService extends BaseService {
  private jobsService: JobsService;
  private pipelineService: PipelineService;
  private resultsService: ResultsService;
  private workshopService: WorkshopService;

  /**
   * Constructs a new instance of WorkflowService.
   * @param apiKey The API key used for authentication.
   * @param jobsService The JobsService instance to use.
   * @param pipelineService The PipelineService instance to use.
   * @param resultsService The ResultsService instance to use.
   * @param workshopService The WorkshopService instance to use.
   * @param baseUrl The base URL for the API (optional).
   */
  constructor(
    apiKey: string,
    jobsService: JobsService,
    pipelineService: PipelineService,
    resultsService: ResultsService,
    workshopService: WorkshopService,
    baseUrl?: string
  ) {
    super(apiKey, baseUrl);
    this.jobsService = jobsService;
    this.pipelineService = pipelineService;
    this.resultsService = resultsService;
    this.workshopService = workshopService;
  }

  /**
   * Queries any Lume object with a filter and returns a pag
   * @param model The model to query.
   * @param params The filter parameters to apply.
   * @param page The page number to fetch (optional, defaults to 1).
   * @param size The number of items per page (optional, defaults to 50).
   * @returns A promise that resolves to a paginated response of the specified model.
   **/
  public async getObjectWithFilterPage<T extends keyof ModelTypeMap>(
    model: T,
    params: Record<string, any>,
    page: number,
    size: number
  ): Promise<PaginatedResponse<ModelTypeMap[T]>> {
    const payload = {
      model,
      params,
    };

    return this.postPaginatedDataWithParams<ModelTypeMap[T]>(
      `/search`,
      payload,
      page,
      size
    );
  }

  /**
   * Creates a job for the specified pipeline, runs the job, and returns the mappings for the result, via a PaginatedResponse.
   * @param pipelineId The ID of the pipeline.
   * @param sourceData The source data to run the job on.
   * @param [immediate_return] Optional. Whether to return immediately after starting the job (optional, defaults to false). This allows for asynchronous job execution and ping the job status later.
   * @returns A promise that resolves to the result of running the job.
   */
  public async executeJobCycle(
    pipelineId: string,
    sourceData: Array<Record<string, any>>
  ): Promise<JobExecutionResponse> {
    const { result, jobId }: CreateAndRunJobResponse =
      await this.jobsService.createAndRunJob(pipelineId, sourceData);
    const mappingsPage = await this.resultsService.getMappingsForResult(
      result.id
    );
    return { result, mappingsPage, jobId };
  }

  /**
   * Creates a job for the specified pipeline, runs the job, and returns the mappings for the result, via a PaginatedResponse.
   * @param pipelineCreatePayload Details of the pipeline to create (PipelineCreatePayload).
   * @param sourceData The source data to run the job on.
   * @param [mapper] Optional. An array of manual mappings to apply to the spec after generation.
   *  If provided, this will override the generated mapping for the specified fields. If omitted, the function proceeds with the generated mappings.
   * @returns A promise that resolves to the result of running the job.
   */
  public async executeJobCycleWithNewPipeline(
    pipelineCreatePayload: PipelineCreatePayload,
    sourceData: Array<Record<string, any>>,
    mapper?: Array<MapperEditSchema>
  ): Promise<JobExecutionResponse> {
    const pipeline = await this.pipelineService.createPipeline(
      pipelineCreatePayload
    );
    const { result, mappingsPage, jobId }: JobExecutionResponse =
      await this.executeJobCycle(pipeline.id, sourceData);

    if (mapper === undefined) {
      return { result, mappingsPage, jobId };
    }

    // Optional step to apply manual mappings to the spec after generation, if mapper is provided
    // This will override the generated mapping for the specified fields, effectively applying the manual mappings upon pipeline creation

    const workshop = await this.workshopService.createWorkshopForJob(jobId);
    const mapper_edits = {
      mapper: mapper,
      auto_deploy: true, // auto deploy the workshop after the edits are applied
    };
    const mappedEditResult: Result =
      await this.workshopService.runWorkshopMapper(workshop.id, mapper_edits);

    const editedMappingsPage = await this.resultsService.getMappingsForResult(
      mappedEditResult.id
    );
    return {
      result: mappedEditResult,
      mappingsPage: editedMappingsPage,
      jobId,
    };
  }

  public async generateConfidenceScoreForPipeline(
    pipelineId: string
  ): Promise<Result> {
    // get most recent job for pipeline
    const jobsPage = await this.jobsService.getJobsForPipeline(
      pipelineId,
      1,
      1
    );
    if (jobsPage.items.length === 0) {
      throw new Error("No jobs found for pipeline");
    }
    const job = jobsPage.items[0];

    const resultPage = await this.resultsService.getJobResults(job.id, 1, 1);
    if (resultPage.items.length === 0) {
      throw new Error(
        "No results found for job in the given pipeline. Cannot generate confidence score."
      );
    }

    const result = resultPage.items[0];
    if (result.status !== "finished") {
      throw new Error(
        "Job has not finished yet. Cannot initiate confidence score generation."
      );
    }

    // generate confidence score
    return await this.resultsService.generateConfidenceScores(result.id);
  }
}

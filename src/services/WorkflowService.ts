// services/WorkflowService.ts

import { BaseService } from "./BaseService";
import { JobCreatePayload, MapperEditSchema, PipelineCreatePayload, Result } from "../models";
import { JobsService } from "./JobsService";
import { WorkshopService } from "./WorkshopService";
import { PipelineService } from "./PipelineService";
import { ResultsService } from "./ResultsService";
import { JobExecutionResponse } from "../models/workflows/JobExecutionResponse";
import { ModelTypeMap } from "../types/ModelTypeMap";
import { PaginatedResponse } from '../types/pagination';

/**
 * Service class for orchestrating workflows involving method calls across services
 * For workflows involving a single service, see the Workflows methods in the service directly.
 */
export class WorkflowService extends BaseService {

    private jobsService: JobsService;
    private pipelineService: PipelineService;
    private resultsService: ResultsService;
    private workshopService: WorkshopService;

    constructor(apiKey: string, jobsService: JobsService, pipelineService: PipelineService, resultsService: ResultsService, workshopService: WorkshopService) {
        super(apiKey);
        this.jobsService = jobsService;
        this.pipelineService = pipelineService;
        this.resultsService = resultsService;
        this.workshopService = workshopService;
    }

    /**
   * Queries any Lume object with a filter and returns a pag
   * @param pipelineId The ID of the pipeline.
   * @param jobCreatePayload Details of the job to create (JobCreatePayload).
   * @returns A promise that resolves to the result of running the job.
   */
    public async getObjectWithFilter<T extends keyof ModelTypeMap>(model: T, params: Record<string, any>): Promise<PaginatedResponse<ModelTypeMap[T]>> {
        const payload = {
            model,
            params,
        };
        return this.post<PaginatedResponse<ModelTypeMap[T]>>(`/search`, payload);
    }

    /**
     * Creates a job for the specified pipeline, runs the job, and returns the mappings for the result, via a PaginatedResponse.
     * @param pipelineId The ID of the pipeline.
     * @param jobCreatePayload Details of the job to create (JobCreatePayload).
     * @param [immediate_return] Optional. Whether to return immediately after starting the job (optional, defaults to false). This allows for asynchronous job execution and ping the job status later.
     * @returns A promise that resolves to the result of running the job.
     */
    public async executeJobCycle(pipelineId: string, jobCreatePayload: JobCreatePayload): Promise<JobExecutionResponse> {
        const result: Result = await this.jobsService.createAndRunJob(pipelineId, jobCreatePayload);
        const mappingsPage = await this.resultsService.getMappingsForResult(result.id);
        return { result, mappingsPage };
    }

    /**
     * Creates a job for the specified pipeline, runs the job, and returns the mappings for the result, via a PaginatedResponse.
     * @param pipelineCreatePayload Details of the pipeline to create (PipelineCreatePayload).
     * @param jobCreatePayload Details of the job to create (JobCreatePayload).
     * @param [mapper] Optional. An array of manual mappings to apply to the spec after generation. 
     *  If provided, this will override the generated mapping for the specified fields. If omitted, the function proceeds with the generated mappings.
     * @returns A promise that resolves to the result of running the job.
     */
    public async executeJobCycleWithNewPipeline(pipelineCreatePayload: PipelineCreatePayload, jobCreatePayload: JobCreatePayload, mapper?: Array<MapperEditSchema>): Promise<JobExecutionResponse> {
        const pipeline = await this.pipelineService.createPipeline(
            pipelineCreatePayload
        );
        const mappingsPage: JobExecutionResponse = await this.executeJobCycle(pipeline.id, jobCreatePayload);

        if (mapper === undefined) {
            return mappingsPage;
        }

        // Optional step to apply manual mappings to the spec after generation, if mapper is provided
        // This will override the generated mapping for the specified fields, effectively applying the manual mappings upon pipeline creation

        if (mappingsPage.result.job_id === null) {
            console.error("job id is null"); // safeguard against null job id error
            return mappingsPage;
        }

        const workshop = await this.workshopService.createWorkshopForJob(mappingsPage.result.job_id);
        const mapper_edits = {
            mapper: mapper,
            auto_deploy: true, // auto deploy the workshop after the edits are applied
        };
        const mappedEditResult: Result = await this.workshopService.runWorkshopMapper(
            workshop.id,
            mapper_edits
        );

        const editedMappingsPage = await this.resultsService.getMappingsForResult(mappedEditResult.id);
        return { result: mappedEditResult, mappingsPage: editedMappingsPage };
    }

    public async generateConfidenceScoreForPipeline(pipelineId: string): Promise<Result> {       
        // get most recent job for pipeline
        const jobsPage = await this.jobsService.getJobsForPipeline(pipelineId, 1, 1);
        if(jobsPage.items.length === 0) {
            throw new Error('No jobs found for pipeline');
        }
        const job = jobsPage.items[0];

        const resultPage = await this.resultsService.getJobResults(job.id, 1, 1);
        if(resultPage.items.length === 0) {
            throw new Error('No results found for job');
        }

        const result = resultPage.items[0];
        if(result.status !== 'finished') {
            throw new Error('Job has not finished');
        }

        // generate confidence score
        return await this.resultsService.generateConfidenceScores(result.id);
    }
}

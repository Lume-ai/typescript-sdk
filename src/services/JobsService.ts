// services/JobsService.ts

import { PaginatedResponse } from "../types/pagination";
import { BaseService } from "./BaseService";
import { Job } from "../models/Job";
import { Workshop } from "../models/workshop/Workshop";
import { Result } from "../models";
import { CreateAndRunJobResponse } from "../models/misc/CreateAndRunJobResponse";

/**
 * Service class for interacting with job-related operations.
 * Provides methods for fetching job details, creating jobs, running jobs, etc.
 */
export class JobsService extends BaseService {
  /**
   * Constructs a new instance of JobsService.
   * @param apiKey The API key used for authentication.
   * @param baseUrl The base URL for the API (optional).
   */
  constructor(apiKey: string, baseUrl?: string) {
    super(apiKey, baseUrl);
  }

  /**
   * Retrieves details of a specific job.
   * @param jobId The ID of the job to fetch details for.
   * @returns A promise that resolves to the job details.
   */
  public async getJob(jobId: string): Promise<Job> {
    return this.get<Job>(`/jobs/${jobId}`);
  }

  /**
   * Fetches all job data.
   * @returns A promise that resolves to a list of all jobs.
   */
  public async getJobs(
    page: number = 1,
    size: number = 50
  ): Promise<PaginatedResponse<Job>> {
    return this.fetchPaginatedData<Job>(`/jobs`, page, size);
  }

  /**
   * Fetches all job data.
   * @param jobId The ID of the job to fetch data for.
   * @param page The page number to fetch.
   * @param size The number of items per page.
   * @returns A promise that resolves to a paginated response of job data.
   */
  public async getJobDataPage(
    jobId: string,
    page: number = 1,
    size: number = 50
  ): Promise<PaginatedResponse<Record<string, any>>> {
    return this.fetchPaginatedData<any>(`/jobs/${jobId}/data`, page, size);
  }

  /**
   * Fetches job data for a specific pipeline.
   * @param jobId The ID of the job to fetch data for.
   * @param page The page number to fetch (optional, defaults to 1).
   * @param size The number of items per page (optional, defaults to 50).
   * @returns A promise that resolves to a paginated response of job data.
   */
  public async getJobsForPipeline(
    pipelineId: string,
    page: number = 1,
    size: number = 50
  ): Promise<PaginatedResponse<Job>> {
    return this.fetchPaginatedData<Job>(
      `/pipelines/${pipelineId}/jobs`,
      page,
      size
    );
  }

  /**
   * Creates a new job for the specified pipeline.
   * @param pipelineId The ID of the pipeline.
   * @param sourceData The source data to run the job on.
   * @returns A promise that resolves to the created job.
   */
  public async createJobForPipeline(
    pipelineId: string,
    sourceData: Array<Record<string, any>>
  ): Promise<Job> {
    // Replace any with a specific type for job creation
    return this.post<Job>(`/pipelines/${pipelineId}/jobs`, {
      data: sourceData,
    });
  }

  /**
   * Runs the specified job.
   * @param jobId The ID of the job to run.
   * @returns A promise that resolves to the job result.
   */
  public async runJob(jobId: string): Promise<Result> {
    let result = await this.post<Result>(`/jobs/${jobId}/run`);

    // Polling logic
    while (
      result.status === Result.status.QUEUED ||
      result.status === Result.status.RUNNING ||
      result.status === Result.status.CREATED
    ) {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before polling again
      result = await this.get<Result>(`/results/${result.id}`); // TODO: abstract this using resultsService
    }

    return result;
  }

  /**
   * Retrieves workshops associated with a specific job.
   * @param jobId The ID of the job.
   * @param page The page number to fetch (optional, defaults to 1).
   * @param size The number of items per page (optional, defaults to 50).
   * @returns A promise that resolves to a paginated response of workshops.
   */
  public async getWorkshopsForJob(
    jobId: string,
    page: number = 1,
    size: number = 50
  ): Promise<PaginatedResponse<Workshop>> {
    return this.fetchPaginatedData<Workshop>(
      `/jobs/${jobId}/workshops`,
      page,
      size
    );
  }

  /**
   * Retrieves the target schema for a specific job.
   * @param jobId
   * @returns
   */
  public async getTargetSchemaForJob(
    jobId: string
  ): Promise<Record<string, any>> {
    return this.get<Record<string, any>>(`/jobs/${jobId}/target_schema`);
  }

  /**
   * Section 2: Workflow abstractions
   *
   * The following methods are abstractions for common workflows that involve multiple API calls.
   * These methods are provided for convenience and to simplify common use cases.
   *
   * These methods are not part of the Lume API, but are provided as a convenience to users of the Lume SDK.
   *
   **/

  /**
   * Creates a job for the specified pipeline and runs the job.
   * @param pipelineId The ID of the pipeline.
   * @param sourceData The source data to run the job on.
   * @returns A promise that resolves to the result of running the job.
   */
  public async createAndRunJob(
    pipelineId: string,
    sourceData: Array<Record<string, any>>
  ): Promise<CreateAndRunJobResponse> {
    const job = await this.createJobForPipeline(pipelineId, sourceData);
    const result: Result = await this.runJob(job.id);
    return { result: result, jobId: job.id };
  }
}

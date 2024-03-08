// services/JobsService.ts

import { PaginatedResponse } from "../types/pagination";
import { BaseService } from "./BaseService";
import { JobSchema } from '../models/JobSchema';
import { WorkshopSchema } from '../models/workshop/WorkshopSchema';
import { CreateJobPayload } from "../models";

/**
 * Service class for interacting with job-related operations.
 * Provides methods for fetching job details, creating jobs, running jobs, etc.
 */
export class JobsService extends BaseService {
    constructor(apiKey: string) {
        super(apiKey);
    }

     /**
     * Retrieves details of a specific job.
     * @param jobId The ID of the job to fetch details for.
     * @returns A promise that resolves to the job details.
     */
    public async getJob(jobId: string): Promise<JobSchema> {
        return this.get<JobSchema>(`/jobs/${jobId}`);
    }

    /**
     * Fetches job data for a specific page.
     * @param jobId The ID of the job to fetch data for.
     * @param page The page number to fetch.
     * @param size The number of items per page.
     * @returns A promise that resolves to a paginated response of job data.
     */
    public async getJobDataPage(jobId: string, page: number = 1, size: number = 50): Promise<PaginatedResponse<JobSchema>> {
        return this.fetchPaginatedData<JobSchema>(`/jobs/${jobId}/data`, page, size);
    }

      /**
     * Fetches job data for a specific page.
     * @param jobId The ID of the job to fetch data for.
     * @param page The page number to fetch (optional, defaults to 1).
     * @param size The number of items per page (optional, defaults to 50).
     * @returns A promise that resolves to a paginated response of job data.
     */
    public async getJobsForPipeline(pipelineId: string, page: number = 1, size: number = 50): Promise<PaginatedResponse<JobSchema>> {
        return this.fetchPaginatedData<JobSchema>(`/pipelines/${pipelineId}/jobs`, page, size);
    }

    /**
     * Creates a new job for the specified pipeline.
     * @param pipelineId The ID of the pipeline.
     * @param createJobPayload Details of the job to create (CreateJobPayload).
     * @returns A promise that resolves to the created job.
     */
    public async createJobForPipeline(pipelineId: string, createJobPayload: CreateJobPayload): Promise<JobSchema> { // Replace any with a specific type for job creation
        return this.post<JobSchema>(`/pipelines/${pipelineId}/jobs`, createJobPayload);
    }

    /**
     * Runs the specified job.
     * @param jobId The ID of the job to run.
     * @returns A promise that resolves to the updated job details.
     */
    public async runJob(jobId: string): Promise<JobSchema> {
        return this.post<JobSchema>(`/jobs/${jobId}/run`);
    }

    /**
     * Retrieves workshops associated with a specific job.
     * @param jobId The ID of the job.
     * @param page The page number to fetch (optional, defaults to 1).
     * @param size The number of items per page (optional, defaults to 50).
     * @returns A promise that resolves to a paginated response of workshops.
     */
    public async getWorkshopsForJob(jobId: string, page: number = 1, size: number = 50): Promise<PaginatedResponse<WorkshopSchema>> {
        return this.fetchPaginatedData<WorkshopSchema>(`/jobs/${jobId}/workshops`, page, size);
    }
}

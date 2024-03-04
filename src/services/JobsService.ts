// services/JobsService.ts

import { PaginatedResponse } from "../types/pagination";
import { BaseService } from "./BaseService";
import { JobSchema__Read } from '../models/JobSchema__Read';
import { WorkshopSchema__Read } from '../models/workshop/WorkshopSchema__Read';
import { JobSchema__Write } from "../models";

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
    public async getJob(jobId: string): Promise<JobSchema__Read> {
        return this.get<JobSchema__Read>(`/jobs/${jobId}`);
    }

    /**
     * Fetches job data for a specific page.
     * @param jobId The ID of the job to fetch data for.
     * @param page The page number to fetch.
     * @param size The number of items per page.
     * @returns A promise that resolves to a paginated response of job data.
     */
    public async getJobDataPage(jobId: string, page: number = 1, size: number = 50): Promise<PaginatedResponse<JobSchema__Read>> {
        return this.fetchPaginatedData<JobSchema__Read>(`/jobs/${jobId}/data`, page, size);
    }

      /**
     * Fetches job data for a specific page.
     * @param jobId The ID of the job to fetch data for.
     * @param page The page number to fetch (optional, defaults to 1).
     * @param size The number of items per page (optional, defaults to 50).
     * @returns A promise that resolves to a paginated response of job data.
     */
    public async getJobsForPipeline(pipelineId: string, page: number = 1, size: number = 50): Promise<PaginatedResponse<JobSchema__Read>> {
        return this.fetchPaginatedData<JobSchema__Read>(`/pipelines/${pipelineId}/jobs`, page, size);
    }

    /**
     * Creates a new job for the specified pipeline.
     * @param pipelineId The ID of the pipeline.
     * @param jobDetails Details of the job to create (JobSchema__Write).
     * @returns A promise that resolves to the created job.
     */
    public async createJobForPipeline(pipelineId: string, jobDetails: JobSchema__Write): Promise<JobSchema__Read> { // Replace any with a specific type for job creation
        return this.post<JobSchema__Read>(`/pipelines/${pipelineId}/jobs`, jobDetails);
    }

    /**
     * Runs the specified job.
     * @param jobId The ID of the job to run.
     * @returns A promise that resolves to the updated job details.
     */
    public async runJob(jobId: string): Promise<JobSchema__Read> {
        return this.post<JobSchema__Read>(`/jobs/${jobId}/run`);
    }

    /**
     * Retrieves workshops associated with a specific job.
     * @param jobId The ID of the job.
     * @param page The page number to fetch (optional, defaults to 1).
     * @param size The number of items per page (optional, defaults to 50).
     * @returns A promise that resolves to a paginated response of workshops.
     */
    public async getWorkshopsForJob(jobId: string, page: number = 1, size: number = 50): Promise<PaginatedResponse<WorkshopSchema__Read>> {
        return this.fetchPaginatedData<WorkshopSchema__Read>(`/jobs/${jobId}/workshops`, page, size);
    }
}

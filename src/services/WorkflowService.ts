// services/WorkflowService.ts

import { BaseService } from "./BaseService";
import { Job, JobCreatePayload, Mapping, PipelineCreatePayload, Result } from "../models";
import { JobsService } from "./JobsService";
import { WorkshopService } from "./WorkshopService";
import { PipelineService } from "./PipelineService";
import { ResultsService } from "./ResultsService";
import { PaginatedResponse } from "../types/pagination";
import { JobExecutionResponse } from "../models/workflows/JobExecutionResponse";

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
     * Creates a job for the specified pipeline, runs the job, and returns the mappings for the result, via a PaginatedResponse.
     * @param pipelineId The ID of the pipeline.
     * @param jobCreatePayload Details of the job to create (JobCreatePayload).
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
     * @returns A promise that resolves to the result of running the job.
     */
    public async executeJobCycleWithNewPipeline(pipelineCreatePayload: PipelineCreatePayload, jobCreatePayload: JobCreatePayload): Promise<JobExecutionResponse> {
        const pipeline = await this.pipelineService.createPipeline(
            pipelineCreatePayload
        );
        const mappingsPage: JobExecutionResponse = await this.executeJobCycle(pipeline.id, jobCreatePayload);
        return mappingsPage;
    }


}
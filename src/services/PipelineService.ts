// services/PipelineService.ts

import { PipelineSchema__Read } from '../models/PipelineSchema__Read';
import { PipelineSchema__Write } from '../models/PipelineSchema__Write';
import { WorkshopSchema__Read } from '../models/workshop/WorkshopSchema__Read';
import { PaginatedResponse } from "../types/pagination";
import { BaseService } from "./BaseService";

/**
 * Service class for interacting with pipeline-related operations.
 * Provides methods for fetching pipeline details, creating pipelines, updating pipelines, etc.
 */
export class PipelineService extends BaseService {

    /**
     * Constructs a new instance of PipelineService.
     * @param apiKey The API key used for authentication.
     */
    constructor(apiKey: string) {
       super(apiKey);
    }

     /**
     * Retrieves a page of pipeline data.
     * @param page The page number to fetch (optional, defaults to 1).
     * @param size The number of items per page (optional, defaults to 50).
     * @returns A promise that resolves to a paginated response of pipeline data.
     */
    public async getPipelineDataPage(page: number = 1, size: number = 50): Promise<PaginatedResponse<PipelineSchema__Read>> {
        return this.fetchPaginatedData<PipelineSchema__Read>(`/pipelines`, page, size);
    }

     /**
     * Creates a new pipeline with the provided details.
     * @param pipelineDetails Details of the pipeline to create.
     * @returns A promise that resolves to the created pipeline.
     */
    public async createPipeline(pipelineDetails: PipelineSchema__Write): Promise<PipelineSchema__Read> { 
        return this.post<PipelineSchema__Read>('/pipelines', pipelineDetails);
    }

    /**
     * Retrieves details of a specific pipeline.
     * @param pipelineId The ID of the pipeline to fetch details for.
     * @returns A promise that resolves to the pipeline details.
     */
    public async getPipeline(pipelineId: string): Promise<PipelineSchema__Read> {
        return this.get<PipelineSchema__Read>(`/pipelines/${pipelineId}`);
    }

      /**
     * Updates an existing pipeline with the provided details.
     * @param pipelineId The ID of the pipeline to update.
     * @param pipelineDetails Details of the pipeline to update.
     * @returns A promise that resolves to the updated pipeline details.
     */
    public async updatePipeline(pipelineId: string, pipelineDetails: PipelineSchema__Write): Promise<PipelineSchema__Read> {
        return this.put<PipelineSchema__Read>(`/pipelines/${pipelineId}`, pipelineDetails);
    }

    /**
     * Deletes a pipeline with the specified ID.
     * @param pipelineId The ID of the pipeline to delete.
     * @returns A promise that resolves when the pipeline is successfully deleted.
     */
    public async deletePipeline(pipelineId: string): Promise<void> {
        return this.delete<void>(`/pipelines/${pipelineId}`);
    }

    /**
     * Retrieves workshops associated with a specific pipeline.
     * @param pipelineId The ID of the pipeline.
     * @param page The page number to fetch (optional, defaults to 1).
     * @param size The number of items per page (optional, defaults to 50).
     * @returns A promise that resolves to a paginated response of workshops.
     */
    public async getWorkshopsForPipeline(pipelineId: string, page: number = 1, size: number = 50): Promise<PaginatedResponse<WorkshopSchema__Read>> {
        return this.fetchPaginatedData<WorkshopSchema__Read>(`/pipelines/${pipelineId}/workshops`, page, size);
    }

     /**
     * Creates a new workshop for the specified pipeline.
     * @param pipelineId The ID of the pipeline.
     * @param workshopDetails Details of the workshop to create.
     * @returns A promise that resolves to the created workshop.
     */
    public async createWorkshopForPipeline(pipelineId: string): Promise<WorkshopSchema__Read> {
        return this.post<WorkshopSchema__Read>(`/pipelines/${pipelineId}/workshops`);
    }
}

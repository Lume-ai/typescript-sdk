// services/PipelineService.ts

import { PipelineSchema } from '../models/Pipeline';
import { CreatePipelinePayload } from '../models/CreatePipelinePayload';
import { WorkshopSchema } from '../models/workshop/Workshop';
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
    public async getPipelineDataPage(page: number = 1, size: number = 50): Promise<PaginatedResponse<PipelineSchema>> {
        return this.fetchPaginatedData<PipelineSchema>(`/pipelines`, page, size);
    }

     /**
     * Creates a new pipeline with the provided details.
     * @param createPipelinePayload Details of the pipeline to create (CreatePipelinePayload).
     * @returns A promise that resolves to the created pipeline.
     */
    public async createPipeline(createPipelinePayload: CreatePipelinePayload): Promise<PipelineSchema> { 
        return this.post<PipelineSchema>('/pipelines', createPipelinePayload);
    }

    /**
     * Retrieves details of a specific pipeline.
     * @param pipelineId The ID of the pipeline to fetch details for.
     * @returns A promise that resolves to the pipeline details.
     */
    public async getPipeline(pipelineId: string): Promise<PipelineSchema> {
        return this.get<PipelineSchema>(`/pipelines/${pipelineId}`);
    }

      /**
     * Updates an existing pipeline with the provided details.
     * @param pipelineId The ID of the pipeline to update.
     * @param updatePipelinePayload Details of the pipeline to update (CreatePipelinePayload).
     * @returns A promise that resolves to the updated pipeline details.
     */
    public async updatePipeline(pipelineId: string, updatePipelinePayload: CreatePipelinePayload): Promise<PipelineSchema> {
        return this.put<PipelineSchema>(`/pipelines/${pipelineId}`, updatePipelinePayload);
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
    public async getWorkshopsForPipeline(pipelineId: string, page: number = 1, size: number = 50): Promise<PaginatedResponse<WorkshopSchema>> {
        return this.fetchPaginatedData<WorkshopSchema>(`/pipelines/${pipelineId}/workshops`, page, size);
    }

     /**
     * Creates a new workshop for the specified pipeline.
     * @param pipelineId The ID of the pipeline.
     * @param workshopDetails Details of the workshop to create.
     * @returns A promise that resolves to the created workshop.
     */
    public async createWorkshopForPipeline(pipelineId: string): Promise<WorkshopSchema> {
        return this.post<WorkshopSchema>(`/pipelines/${pipelineId}/workshops`);
    }
}

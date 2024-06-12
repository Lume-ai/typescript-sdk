// services/PipelineService.ts

import { PipelineCreatePayload, PipelineUpdatePayload } from '../models';
import { Pipeline } from '../models/Pipeline';
import { Workshop } from '../models/workshop/Workshop';
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
    public async getPipelineDataPage(page: number = 1, size: number = 50): Promise<PaginatedResponse<Pipeline>> {
        return this.fetchPaginatedData<Pipeline>(`/pipelines`, page, size);
    }

     /**
     * Creates a new pipeline with the provided details.
     * @param pipelineCreatePayload Details of the pipeline to create (PipelineCreatePayload).
     * @returns A promise that resolves to the created pipeline.
     */
    public async createPipeline(pipelineCreatePayload: PipelineCreatePayload): Promise<Pipeline> { 
        return this.post<Pipeline>('/pipelines', pipelineCreatePayload);
    }

    /**
     * Retrieves details of a specific pipeline.
     * @param pipelineId The ID of the pipeline to fetch details for.
     * @returns A promise that resolves to the pipeline details.
     */
    public async getPipeline(pipelineId: string): Promise<Pipeline> {
        return this.get<Pipeline>(`/pipelines/${pipelineId}`);
    }

      /**
     * Updates an existing pipeline with the provided details.
     * @param pipelineId The ID of the pipeline to update.
     * @param pipelineUpdatePayload Details of the pipeline to update (PipelineUpdatePayload).
     * @returns A promise that resolves to the updated pipeline details.
     */
    public async updatePipeline(pipelineId: string, pipelineUpdatePayload: PipelineUpdatePayload): Promise<Pipeline> {
        return this.put<Pipeline>(`/pipelines/${pipelineId}`, pipelineUpdatePayload);
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
    public async getWorkshopsForPipeline(pipelineId: string, page: number = 1, size: number = 50): Promise<PaginatedResponse<Workshop>> {
        return this.fetchPaginatedData<Workshop>(`/pipelines/${pipelineId}/workshops`, page, size);
    }

     /**
     * Creates a new workshop for the specified pipeline.
     * @param pipelineId The ID of the pipeline.
     * @param workshopDetails Details of the workshop to create.
     * @returns A promise that resolves to the created workshop.
     */
    public async createWorkshopForPipeline(pipelineId: string): Promise<Workshop> {
        return this.post<Workshop>(`/pipelines/${pipelineId}/workshops`);
    }

    /**
     * Retrieves the target schema for a specific pipeline.
     * @param pipelineId 
     * @returns 
     */
    public async getTargetSchemaForPipeline(pipelineId: string): Promise<any> {
        return this.get<any>(`/pipelines/${pipelineId}/target_schema`);
    }

    /**
     * Trains the AI using the pipeline's lookup tables .
     * @param pipelineId The ID of the pipeline to train.
     * @param targetPropertyNames  (optional) The target properties to train the AI on.
     * @returns 
     */
    public async learn(pipelineId: string, targetPropertyNames?: string[]): Promise<void> {
        return this.post<void>(`/pipelines/${pipelineId}/learn`, { target_field_names: targetPropertyNames});
    }
}

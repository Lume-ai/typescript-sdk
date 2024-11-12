// services_v3/PipelineService.ts

import { ApiClient } from './ApiClient';
import { Pipeline as PipelineData, PipelineCreate, PipelineEdit } from '../models/Pipeline';
import { Pipeline } from './Pipelines';
import { Page } from '../models/models';
import { HTTPExceptionError } from '../models/Error';
import { formatHTTPExceptionError } from '../utils/errorUtils';

export class PipelineService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  /**
   * Create and run a pipeline.
   */
  /**
   * Retrieves all pipelines with pagination.
   * @param page Page number for pagination.
   * @param size Number of items per page.
   * @returns A paginated list of Pipeline instances.
   */
  public async getAllPipelines(
    page: number = 1,
    size: number = 50
  ): Promise<Page<Pipeline>> {
    const params = { page, size };
    const pipelinesData = await this.apiClient.get<Page<PipelineData>>('/pipelines', { params });

    // Map each PipelineData to a Pipeline instance
    const pipelines = pipelinesData.items.map(
      (pipelineData) => new Pipeline(this.apiClient, pipelineData)
    );

    return {
      ...pipelinesData,
      items: pipelines,
    };
  }

  /**
   * Retrieves a single pipeline by ID.
   * @param id The ID of the pipeline.
   * @returns The Pipeline instance.
   */
  public async getPipelineById(id: string): Promise<Pipeline> {
    const pipelineData = await this.apiClient.get<PipelineData>(`/pipelines/${id}`);
    return new Pipeline(this.apiClient, pipelineData);
  }

  /**
   * Creates a new pipeline.
   * @param data The data for creating the pipeline.
   * @returns The created Pipeline instance.
   */
  public async createPipeline(data: PipelineCreate): Promise<Pipeline> {
    
    const pipelineData = await this.apiClient.post<PipelineData>('/pipelines', data);
    return new Pipeline(this.apiClient, pipelineData);
    
  }

  /**
   * Updates a pipeline by ID.
   * @param id The ID of the pipeline to update.
   * @param data The data to update the pipeline with.
   * @returns The updated Pipeline instance.
   */
  public async updatePipeline(id: string, data: PipelineEdit): Promise<Pipeline> {
    const updatedPipelineData = await this.apiClient.patch<PipelineData>(`/pipelines/${id}`, data);
    return new Pipeline(this.apiClient, updatedPipelineData);
  }

  /**
   * Deletes a pipeline by ID.
   * @param id The ID of the pipeline to delete.
   */
  public async deletePipeline(id: string): Promise<void> {
    await this.apiClient.delete(`/pipelines/${id}`);
  }
}

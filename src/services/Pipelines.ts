// services_v3/Pipeline.ts

import { ApiClient } from './ApiClient';
import { Page, Status } from '../models/models';
import { Pipeline as PipelineData, PipelineEdit} from '../models/Pipeline';
import { RunCreate } from '../models/Run';
import { Mapper as MapperData, MapperCreate } from '../models/Mapper';
import { IncludeResource } from '../models/IncludeResources';
import { Run } from './Run';
import { Mapper } from './Mapper';
import { HTTPExceptionError } from '../models/Error';
import { formatHTTPExceptionError } from '../utils/errorUtils';

//export type PublicPipeline = Omit<Pipeline, 'apiClient'>;

export class Pipeline {
  // Pipeline Properties
  public id: string;
  public user_id: string;
  public name: string;
  public description?: string | null;
  public last_run_status?: Status | null;
  public mapper: MapperData;

  // Private ApiClient instance
  private apiClient!: ApiClient;

  /**
   * Initializes a new instance of the Pipeline class.
   * @param apiClient An instance of ApiClient for API interactions.
   * @param data The pipeline data.
   */
  constructor(apiClient: ApiClient, data: PipelineData) {

    // Define 'apiClient' as a non-enumerable property
    Object.defineProperty(this, 'apiClient', {
      value: apiClient,
      enumerable: false,   // Makes the property non-enumerable
      writable: true,      // Allows the property to be modified if needed
      configurable: true   // Allows the property to be reconfigured or deleted
    });

    this.id = data.id;
    this.user_id = data.user_id;
    this.name = data.name;
    this.description = data.description;
    this.last_run_status = data.last_run_status;
    this.mapper = data.mapper
  }


  /**
   * Refreshes the pipeline data from the server.
   */
  public async get(include?: IncludeResource[],): Promise<void> {
    const params = {include}
    const pipelineData = await this.apiClient.get<PipelineData>(`/pipelines/${this.id}`, {params});
    this.name = pipelineData.name;
    this.description = pipelineData.description;
    this.last_run_status = pipelineData.last_run_status;
    this.mapper = pipelineData.mapper;
  }

  /**
   * Updates the pipeline with the provided data.
   * @param data The data to update the pipeline with.
   */
  public async update(data: PipelineEdit): Promise<Pipeline> {
    const updatedPipeline = await this.apiClient.patch<PipelineData>(
      `/pipelines/${this.id}`,
      data
    );
    // Update the current instance with the new data
    this.name = updatedPipeline.name;
    this.description = updatedPipeline.description;
    this.last_run_status = updatedPipeline.last_run_status;
    this.mapper = updatedPipeline.mapper;
    return this;
  }

  /**
   * Deletes the pipeline.
   */
  public async delete(): Promise<void> {
    await this.apiClient.delete(`/pipelines/${this.id}`, undefined, 'https://api.lume.ai/crud');
  }

  /**
   * Creates a new run for the pipeline.
   * @param data The data for the run.
   * @returns The created Run object.
   */
  public async createRun(data: RunCreate): Promise<Run> {
    const newRun = await this.apiClient.post<Run>(`/pipelines/${this.id}/runs`, data);
    return new Run(this.apiClient, newRun, this.id);  
  }

  /**
   * Fetches all runs for the pipeline.
   * @param mapper_id Optional mapper ID to filter runs.
   * @param page Page number for pagination.
   * @param size Number of items per page.
   * @returns A paginated list of runs.
   */
  public async getRuns(
    mapper_id?: number | null,
    page: number = 1,
    size: number = 50
  ): Promise<Page<Run>> {
    const params = { mapper_id, page, size };
    const runs = await this.apiClient.get<Page<Run>>(`/pipelines/${this.id}/runs`, { params });

    // Map each item to a Run instance and return with pagination metadata
    return {
        items: runs.items.map(runData => new Run(this.apiClient, runData, this.id)),
        total: runs.total,
        page: runs.page,
        size: runs.size,
    };
  }

  /**
   * Fetches a specific run by run ID.
   * @param run_id The ID of the run.
   * @param include Resources to include.
   * @param mapper_id Optional mapper ID.
   * @param page Page number for pagination.
   * @param size Number of items per page.
   * @returns The requested Run object.
   */
  public async getRunById(
    run_id: number,
    include?: IncludeResource[],
    mapper_id?: number | null,
    page: number = 1,
    size: number = 50
  ): Promise<Run> {
    const params = { include, mapper_id, page, size };
    const run = await this.apiClient.get<Run>(`/pipelines/${this.id}/runs/${run_id}`, { params });
    return new Run(this.apiClient, run, this.id);
  }

  /**
   * Creates a new mapper for the pipeline.
   * @param data The data for the mapper.
   * @returns The created Mapper object.
   */
  public async createMapper(data: MapperCreate): Promise<Mapper> {
    const newMapper = await this.apiClient.post<Mapper>(`/pipelines/${this.id}/mappers`, data);
    return new Mapper(this.apiClient, this.id, newMapper.version, newMapper.user_id, newMapper.creation_status, newMapper.target_schema, newMapper.transformations, newMapper.manifest);
  }

  /**
   * Fetches all mappers for the pipeline.
   * @param page Page number for pagination.
   * @param size Number of items per page.
   * @returns A paginated list of mappers.
   */
  public async getMappers(
    page: number = 1,
    size: number = 50
  ): Promise<Page<Mapper>> {
    const params = { page, size };
    const mappers = await this.apiClient.get<Page<Mapper>>(`/pipelines/${this.id}/mappers`, { params });
    return {
        items: mappers.items.map(mapperData => new Mapper(this.apiClient, this.id, mapperData.version, mapperData.user_id, mapperData.creation_status, mapperData.target_schema ?? null, mapperData.transformations ?? null, mapperData.manifest ?? null)),
        total: mappers.total,
        page: mappers.page,
        size: mappers.size,
    };
  }

  /**
   * Fetches a specific mapper by version.
   * @param version The version number of the mapper.
   * @param include Resources to include.
   * @param page Page number for pagination.
   * @param size Number of items per page.
   * @returns The requested Mapper object.
   */
  public async getMapperByVersion(
    version: number,
    include?: IncludeResource[],
    page: number = 1,
    size: number = 50
  ): Promise<Mapper> {
    const params = { include, page, size };
    console.log('Get mapper by version:', `/pipelines/${this.id}/mappers/${version}`);
    console.log(params);
    const mapper = await this.apiClient.get<Mapper>(`/pipelines/${this.id}/mappers/${version}`, { params });
    return new Mapper(this.apiClient, this.id, mapper.version, mapper.user_id, mapper.creation_status, mapper.target_schema ?? null, mapper.transformations ?? null, mapper.manifest ?? null);
  }

  public async getValues(): Promise<PipelineData> {
    return {
      id: this.id,
      user_id: this.user_id,
      name: this.name,
      description: this.description,
      last_run_status: this.last_run_status,
      mapper: this.mapper,
    }
  }
}
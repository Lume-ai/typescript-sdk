// Run.ts or within Run class in your pipeline service file

import { Mapping, PageMapping } from '../models/Mapping';
import { Run as RunData } from '../models/Run';
import { Mapper } from '../models/Mapper';
import { ApiClient } from './ApiClient'; // Import the API client
import { HTTPExceptionError } from '../models/Error';
import { formatHTTPExceptionError } from '../utils/errorUtils';
import { Page, Status } from '../models/models';
import { IncludeResource } from '../models/IncludeResources';

// Define public types that omit apiClient and pipeline_id
//export type PublicRun = Omit<Run, 'apiClient' | 'pipeline_id'>;

export class Run {
  private apiClient!: ApiClient;
  public number: number;
  public user_id: string;
  public status: Status;
  public mapper: Mapper; // Adjust types based on your data model
  public mappings: PageMapping; // Adjust types based on your data model
  private pipeline_id!: string 

  constructor(apiClient: ApiClient, runData: any, pipeline_id: string) {

    // Define 'apiClient' as a non-enumerable property
    Object.defineProperty(this, 'apiClient', {
      value: apiClient,
      enumerable: false,   // Makes the property non-enumerable
      writable: true,      // Allows the property to be modified if needed
      configurable: true   // Allows the property to be reconfigured or deleted
    });

    // Define 'pipeline_id' as a non-enumerable property
    Object.defineProperty(this, 'pipeline_id', {
      value: pipeline_id,
      enumerable: false,   // Makes the property non-enumerable
      writable: true,      // Allows the property to be modified if needed
      configurable: true   // Allows the property to be reconfigured or deleted
    });

    this.number = runData.number;
    this.user_id = runData.user_id;
    this.status = runData.status;
    this.mapper = runData.mapper;
    this.mappings = runData.mappings;
  }

  /**
   * Refreshes the Run instance with the latest data from the API.
   */
  public async get(include?: IncludeResource[]): Promise<void> {
    const updatedData = await this.apiClient.get<Run>(`/pipelines/${this.pipeline_id}/runs/${this.number}`, { params: { include } });
    this.status = updatedData.status;
    this.mapper = updatedData.mapper;
    this.mappings = updatedData.mappings;
  }

  /**
   * Refreshes the Run instance with the query parameter Mapper
   */
  public async getMapper(): Promise<Mapper> {
    const mapper = await this.apiClient.get<Mapper>(`/pipelines/${this.pipeline_id}/mappers/${this.mapper.version}`);
    return mapper;    
  }

  public async getMappings(page: number = 1, size: number = 50): Promise<PageMapping> {
    const runData = await this.apiClient.get<Run>(`/pipelines/${this.pipeline_id}/runs/${this.number}?mapper_id=${this.mapper.version}&include=mappings&page=${page}&size=${size}`);
    return runData.mappings
  }

  public async getValues(): Promise<RunData> {
    return {
      number: this.number,
      user_id: this.user_id,
      status: this.status,
      mapper: this.mapper,
      mappings: this.mappings,
    }
  }

}

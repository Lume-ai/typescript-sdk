// models/Mapper.ts

import { Status } from '../models/models';
import { Transformation } from '../models/Transformation';
import { PageManifestItem } from '../models/Manifest';
import { ApiClient } from './ApiClient';
import { MapperCreate, Mapper as MapperData } from '../models/Mapper';
import { IncludeResource } from '../models/IncludeResources';
import { PipelineEdit } from '../models/Pipeline';

// Define public types that omit apiClient and pipeline_id
//export type PublicMapper = Omit<Mapper, 'apiClient' | 'pipeline_id'>;

export class Mapper {
  version: number;
  user_id: string;
  creation_status: Status;
  target_schema: object | null;
  transformations: Transformation[] | null;
  manifest: PageManifestItem | null;
  private pipeline_id!: string;
  private apiClient!: ApiClient;
  constructor(
    apiClient: ApiClient,
    pipeline_id: string,
    version: number,
    user_id: string,
    creation_status: Status,
    target_schema?: object | null,
    transformations?: Transformation[] | null,
    manifest?: PageManifestItem | null
  ) {

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

    this.user_id = user_id;
    this.version = version;
    this.creation_status = creation_status;
    this.target_schema = target_schema || null;
    this.transformations = transformations || null;
    this.manifest = manifest || null;
  }

  /**
   * Refreshes the Mapper instance with the latest data from the API.
   */
  public async get(include?: IncludeResource[]): Promise<void> {
    const updatedData = await this.apiClient.get<Mapper>(`/pipelines/${this.pipeline_id}/mappers/${this.version}`, { params: { include } });
    this.creation_status = updatedData.creation_status;
    this.target_schema = updatedData.target_schema;
    this.transformations = updatedData.transformations;
    this.manifest = updatedData.manifest; 
  }

  public async getManifest(): Promise<PageManifestItem> {
    const manifest = await this.apiClient.get<PageManifestItem>(`/pipelines/${this.pipeline_id}/mappers/${this.version}?include=manifest`);
    return manifest;    
  }

  public async getTransformations(): Promise<Transformation[] | null> {
    const mapperData = await this.apiClient.get<Mapper>(`/pipelines/${this.pipeline_id}/mappers/${this.version}?include=transformations`);
    return mapperData.transformations; 
  }

  public async getTargetSchema(): Promise<object | null> {
    const mapperData = await this.apiClient.get<Mapper>(`/pipelines/${this.pipeline_id}/mappers/${this.version}?include=target_schema`);
    return mapperData.target_schema;         
  }

  public async update(data: MapperCreate): Promise<Mapper> {
    data.base_version = this.version;
    const updatedMapper = await this.apiClient.post<Mapper>(`/pipelines/${this.pipeline_id}/mappers/`, data);
    return updatedMapper;
  }

  public async apply(): Promise<void> {
    console.log('Applying mapper...');
    console.log(this.version);
    const data: PipelineEdit = {
      mapper_version: this.version,
    };
    await this.apiClient.patch<void>(`/pipelines/${this.pipeline_id}`, data);
  }

  // get just the mapper data
  public async getValues(): Promise<MapperData> {
    return {
      version: this.version,
      user_id: this.user_id,
      creation_status: this.creation_status,
      target_schema: this.target_schema,
      transformations: this.transformations,
      manifest: this.manifest,
    }
  }
}

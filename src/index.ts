// services_v3/Lume.ts

// include interface models
import { Pipeline, PipelineSimple, PipelineClone, TargetSchema, TargetSchemaCreate, TargetSchemaUpdate, Status, Mapper, Run, Mapping, Schema, HTTPExceptionError, IncludeResource, ManifestItem, Lookup, Transformation, Page } from './models/index';

import { ApiClient } from './services/ApiClient';
import { PipelineService } from './services/PipelineService';
import { TargetSchemaService } from './services/TargetSchemaService';
import { Mapper as MapperClass } from './services/Mapper';
import { Run as RunClass } from './services/Run';
import { Pipeline as PipelineClass } from './services/Pipelines';
// Import other services as they are created
// import { AnotherService } from './AnotherService';
const PROD_ENDPOINT = "https://api.lume.ai/v2";

export class Lume {
  public pipelineService: PipelineService;
  public targetSchemaService: TargetSchemaService;
  // public anotherService: AnotherService;

  private apiClient: ApiClient;

  /**
   * Initializes the Lume SDK with the provided API key and base URL.
   * @param apiKey Your Lume API key.
   * @param baseURL The base URL for the Lume API.
   */
  constructor(apiKey: string, baseURL: string = PROD_ENDPOINT) {
    this.apiClient = new ApiClient(apiKey, baseURL);
    this.pipelineService = new PipelineService(this.apiClient);
    this.targetSchemaService = new TargetSchemaService(this.apiClient);
    // Initialize other services similarly
    // this.anotherService = new AnotherService(this.apiClient);
  }
}

export {PipelineClass, MapperClass, RunClass, Pipeline, PipelineSimple, PipelineClone, TargetSchema, TargetSchemaCreate, TargetSchemaUpdate, Mapper, Run, Mapping, Schema, HTTPExceptionError, IncludeResource, ManifestItem, Lookup, Transformation, Page, Status };

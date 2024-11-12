// services_v3/Lume.ts

import { ApiClient } from './services/ApiClient';
import { PipelineService } from './services/PipelineService';
import { TargetSchemaService } from './services/TargetSchemaService';
// Import other services as they are created
// import { AnotherService } from './AnotherService';
const PROD_ENDPOINT = "https://logic.lume-terminus.com/v2";

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

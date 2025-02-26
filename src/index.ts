// services_v3/Lume.ts

// include interface models

import {
  Flow,
  CreateFlowDto,
  SearchFlowsDto,
  SearchRunsDto,
  Run,
  CreateRunDto,
  CreateDataJoinRunDto,
} from "./models/flow";
import { Page } from "./models/models";
import { Schema, TargetSchema } from "./models/Schema";
import { Steps, BaseModel } from "./models/shared";
import {
  SchemaTransformer,
  SchemaTransformerInput,
  SchemaTransformerOutput,
  SchemaTransformerTargetField,
} from "./models/schemaTransform";
import { Status } from "./models/status";

import { ApiClient } from "./services/ApiClient";
import { FlowService } from "./services/FlowService";

// Import other services as they are created
// import { AnotherService } from './AnotherService';
import { Flow as FlowClass } from "./services/Flow";
import { Run as RunClass } from "./services/Run";
const PROD_ENDPOINT = "https://api.lume-terminus.com";
/**
 * Lume AI TypeScript SDK
 * Main entry point for interacting with the Lume AI API.
 *
 * @example
 * ```typescript
 * import { Lume } from '@lume-ai/typescript-sdk';
 *
 * const lume = new Lume('your-api-key');
 * const flow = await lume.flowService.createFlow({
 *   name: 'My Flow',
 *   description: 'Data transformation flow',
 *   target_schema: mySchema,
 *   tags: ['production']
 * });
 * ```
 */
export class Lume {
  public flowService: FlowService;
  // public anotherService: AnotherService;

  private apiClient: ApiClient;

  /**
   * Initializes the Lume SDK.
   * @param apiKey - Your Lume API authentication key
   * @param baseURL - Optional custom API endpoint (defaults to production)
   */
  constructor(apiKey: string, baseURL: string = PROD_ENDPOINT) {
    this.apiClient = new ApiClient(apiKey, baseURL);
    this.flowService = new FlowService(this.apiClient);
    // Initialize other services similarly
    // this.anotherService = new AnotherService(this.apiClient);
  }
}

export {
  FlowClass,
  RunClass,
  Flow,
  Run,
  CreateFlowDto,
  SearchFlowsDto,
  SearchRunsDto,
  CreateRunDto,
  CreateDataJoinRunDto,
  Page,
  Schema,
  TargetSchema,
  Steps,
  BaseModel,
  SchemaTransformer,
  SchemaTransformerInput,
  SchemaTransformerOutput,
  SchemaTransformerTargetField,
  Status,
};

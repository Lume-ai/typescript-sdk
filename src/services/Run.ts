// Run.ts or within Run class in your pipeline service file

import { Run as RunData } from "../models/flow";
import { ApiClient } from "./ApiClient"; // Import the API client
import { Steps } from "../models/shared";
import { Status } from "../models/status";
import {
  SchemaTransformerInput,
  SchemaTransformerOutput,
} from "../models/schemaTransform";
import { SchemaTransformer } from "./SchemaTransformer";

// Define public types that omit apiClient and pipeline_id
//export type PublicRun = Omit<Run, 'apiClient' | 'pipeline_id'>;

/**
 * Represents a single execution of a flow.
 * Contains information about the transformation process and results.
 */
export class Run {
  private apiClient!: ApiClient;

  public id: string;
  public type: string;
  public status: Status;
  public created_at: string;
  public updated_at: string;
  public user_id: string;
  public flow_id: string;

  public metadata: any;
  public steps?: Steps[];
  public runId?: string;
  public file_name?: string;

  constructor(apiClient: ApiClient, runData: any, flow_id: string) {
    // Define 'apiClient' as a non-enumerable property
    Object.defineProperty(this, "apiClient", {
      value: apiClient,
      enumerable: false, // Makes the property non-enumerable
      writable: true, // Allows the property to be modified if needed
      configurable: true, // Allows the property to be reconfigured or deleted
    });

    // Define 'pipeline_id' as a non-enumerable property
    Object.defineProperty(this, "flow_id", {
      value: flow_id,
      enumerable: false, // Makes the property non-enumerable
      writable: true, // Allows the property to be modified if needed
      configurable: true, // Allows the property to be reconfigured or deleted
    });

    this.id = runData.id;
    this.user_id = runData.user_id;
    this.type = runData.type;
    this.flow_id = flow_id;
    this.status = runData.status;
    this.created_at = runData.created_at;
    this.updated_at = runData.updated_at;
    this.metadata = runData.metadata ?? {};
    this.steps = runData.steps;
  }

  /**
   * Refreshes the Run instance with the latest data from the API.
   */
  public async get(): Promise<void> {
    const response = await this.apiClient.get<any>(`/flows/${this.flow_id}`, {
      params: { run_id: this.id },
    });
    // Response is a flow

    // Update specific fields from the response
    this.user_id = response.user_id;
    this.type = response.type;
    this.status = response.status;
    this.created_at = response.created_at;
    this.updated_at = response.updated_at;
    this.metadata = response.metadata ?? {};
    this.steps = response.steps;
    // Note: We don't update flow_id as it's a non-enumerable property
  }

  public async getValues(): Promise<RunData> {
    return {
      id: this.id,
      type: this.type,
      name: this.metadata?.name ?? "",
      status: this.status,
      created_at: this.created_at,
      updated_at: this.updated_at,
      user_id: this.user_id,
      flow_id: this.flow_id,
      metadata: this.metadata,
      steps: this.steps,
      runId: this.runId,
      file_name: this.file_name,
    };
  }

  /**
   * Retrieves the schema transformer output for this run.
   * This includes the mapped data and any validation errors.
   *
   * @param page - Page number for paginated results
   * @param size - Number of items per page
   * @returns The transformer output or null if not applicable
   *
   * @example
   * ```typescript
   * const output = await run.getSchemaTransformerOutput();
   * if (output) {
   *   console.log(output.mapped_data.items);
   * }
   * ```
   */
  public async getSchemaTransformerOutput(
    page: number = 1,
    size: number = 50
  ): Promise<SchemaTransformerOutput | null> {
    if (!this.steps || this.steps.length < 2) {
      return null;
    }

    const schemaTransformStep = this.steps[this.steps.length - 2];
    if (schemaTransformStep.type !== "schema_transform") {
      return null;
    }

    const transformer = new SchemaTransformer(
      this.apiClient,
      schemaTransformStep.id,
      schemaTransformStep.type,
      schemaTransformStep.status as Status,
      this.created_at,
      this.updated_at,
      this.user_id,
      {} as SchemaTransformerInput,
      {} as SchemaTransformerOutput,
      [],
      this.metadata?.name ?? "",
      this.flow_id
    );

    await transformer.get({ page, size });
    return transformer.output;
  }
}

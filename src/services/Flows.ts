// services_v3/Pipeline.ts

import { ApiClient } from "./ApiClient";
import { CreateRunDto, Flow as FlowData } from "../models/flow";
import { Run } from "./Run";
import { Status } from "../models/status";
import { Steps } from "../models/shared";
import { SchemaTransformer } from "./SchemaTransformer";
import {
  SchemaTransformerInput,
  SchemaTransformerOutput,
} from "../models/schemaTransform";
import { Page } from "../models/models";

//export type PublicPipeline = Omit<Pipeline, 'apiClient'>;

/**
 * Represents a data transformation flow in Lume.
 * A flow contains the configuration for transforming source data into a target schema.
 */
export class Flow {
  // Flow Properties
  public id: string;
  public user_id: string;
  public version: number;
  public tags: string[];
  public description: string;
  public steps: Steps[];
  public name: string;
  public status: Status;
  public created_at: string;
  public updated_at: string;

  // Private ApiClient instance
  private apiClient!: ApiClient;

  /**
   * Initializes a new instance of the Flow class.
   * @param apiClient An instance of ApiClient for API interactions.
   * @param data The flow data.
   */
  constructor(apiClient: ApiClient, data: FlowData) {
    // Define 'apiClient' as a non-enumerable property
    Object.defineProperty(this, "apiClient", {
      value: apiClient,
      enumerable: false, // Makes the property non-enumerable
      writable: true, // Allows the property to be modified if needed
      configurable: true, // Allows the property to be reconfigured or deleted
    });

    this.id = data.id;
    this.user_id = data.user_id;
    this.version = data.version;
    this.tags = data.tags;
    this.description = data.description;
    this.steps = data.steps;
    this.name = data.name;
    this.status = data.status;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  /**
   * Refreshes the flow's data from the API.
   *
   * @example
   * ```typescript
   * await flow.get();
   * console.log(flow.status); // Latest status
   * ```
   */
  public async get(): Promise<void> {
    const flowData = await this.apiClient.get<Flow>(`/flows/${this.id}`);
    this.version = flowData.version;
    this.tags = flowData.tags;
    this.description = flowData.description;
    this.steps = flowData.steps;
    this.name = flowData.name;
    this.status = flowData.status;
  }

  /**
   * Creates a new run of this flow with provided data.
   *
   * @param data - The source data to transform
   * @param wait - If true, waits for the run to complete before returning
   * @returns A new Run instance
   *
   * @example
   * ```typescript
   * const run = await flow.createRun({
   *   data: sourceData
   * }, true);
   * console.log(run.status); // 'SUCCEEDED'
   * ```
   */
  public async createRun(
    data: CreateRunDto,
    wait: boolean = false
  ): Promise<Run> {
    const newRun = await this.apiClient.post<Run>(
      `/flows/${this.id}/runs`,
      data
    );
    if (!wait) {
      return new Run(this.apiClient, newRun, this.id);
    }
    const run = new Run(this.apiClient, newRun, this.id);
    while (
      run.status == Status.PENDING ||
      run.status == Status.RUNNING ||
      run.status == Status.CREATED
    ) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await run.get();
    }
    return run;
  }

  /**
   * Fetches a specific run by run ID.
   * @param run_id The ID of the run.
   * @returns The requested Run object or undefined.
   */
  public async getRun(run_id: string): Promise<Run | undefined> {
    const response = await this.apiClient.get<Run>(`/flows/${this.id}`, {
      params: { run_id },
    });
    return new Run(this.apiClient, response, this.id);
  }

  /**
   * Fetches all runs for this flow.
   * @returns Array of Run objects or undefined.
   */
  public async getRuns(): Promise<Run[] | undefined> {
    const response = await this.apiClient.get<Run[]>(`/flows/${this.id}/runs`);
    if (!Array.isArray(response)) {
      return undefined;
    }
    return response.map((runData) => {
      // Ensure steps are properly passed through
      const run = new Run(
        this.apiClient,
        {
          ...runData,
          steps: runData.steps || [], // Ensure steps is at least an empty array if undefined
        },
        this.id
      );
      return run;
    });
  }

  /**
   * Processes new data through this flow
   * @param sourceData The source data to process
   * @param page The page number (1-based indexing)
   * @param size The number of items per page
   * @returns Paginated array of processed data items
   */
  public async process(
    sourceData: any[],
    page: number = 1,
    size: number = 50
  ): Promise<Page<any>> {
    const run = await this.createRun({ source_data: sourceData }, true);
    return this.getRunResults(run, page, size);
  }

  /**
   * Gets results from a specific run with pagination support
   * @param run The run to get results from
   * @param page The page number (1-based indexing)
   * @param size The number of items per page
   * @returns Paginated array of mapped data items
   */
  public async getRunResults(
    run: Run,
    page: number = 1,
    size: number = 50
  ): Promise<Page<any>> {
    const output = await run.getSchemaTransformerOutput(page, size);
    return output?.mapped_data || { items: [], total: 0 };
  }

  /**
   * Gets the results from the most recent successful run
   * @param page The page number (1-based indexing)
   * @param size The number of items per page
   * @returns The paginated results from the most recent successful run
   */
  public async getLatestRunResults(
    page: number = 1,
    size: number = 50
  ): Promise<Page<any> | null> {
    const runs = await this.getRuns();
    if (!runs?.length) return null;

    // Sort runs by creation date (newest first)
    const sortedRuns = runs.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    // Find the most recent successful run
    const latestSuccessfulRun = sortedRuns.find(
      (run) => run.status === Status.SUCCEEDED
    );
    if (!latestSuccessfulRun) return null;

    const run = await this.getRun(latestSuccessfulRun.id);
    if (!run) return null;

    return this.getRunResults(run, page, size);
  }
}

import { ApiClient } from "./ApiClient";
import { Steps } from "../models/shared";
import { Status } from "../models/status";
import {
  SchemaTransformerInput,
  SchemaTransformerOutput,
} from "../models/schemaTransform";
import { SchemaTransformer } from "./SchemaTransformer";
import { RunError } from "../models/LumeError";

/**
 * Represents a single execution of a flow.
 * The internal steps array may include a schema transform step
 * that we use to retrieve final mapped data.
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

  constructor(apiClient: ApiClient, runData: any, flow_id: string, run_id?: string) {
    Object.defineProperty(this, "apiClient", {
      value: apiClient,
      enumerable: false,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(this, "flow_id", {
      value: flow_id,
      enumerable: false,
      writable: true,
      configurable: true,
    });

    this.id = run_id ?? runData.id;
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
   * Polls until the run is complete (status = SUCCEEDED/FAILED/CRASHED).
   * If the run ends with a fail status, we throw a RunError with details.
   */
  public async waitForCompletion(pollIntervalMs: number = 1000): Promise<void> {
    while (
      this.status === Status.CREATED ||
      this.status === Status.PENDING ||
      this.status === Status.RUNNING
    ) {
      await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
      await this.get(); // refresh run status
    }
    if (this.status === Status.FAILED || this.status === Status.CRASHED) {
      throw new RunError(`Run ${this.id} ended in ${this.status}`, {
        runId: this.id,
        status: this.status,
      });
    }
  }

  /**
   * Refresh the Run instance with the latest data from the API.
   * (Your existing code uses the same endpoint to fetch flow data with run_id param.)
   */
  public async get(): Promise<void> {
    try {
      const response = await this.apiClient.get<any>(`/flows/${this.flow_id}`, {
        params: { run_id: this.id },
      });
      // The response is a Flow, so we find the run portion.
      // Depending on your backend, you might get the entire Flow object including steps.
      // We'll assume the server returns just the run if run_id param is present.
      this.user_id = response.user_id;
      this.type = response.type;
      this.status = response.status;
      this.created_at = response.created_at;
      this.updated_at = response.updated_at;
      this.metadata = response.metadata ?? {};
      this.steps = response.steps;
    } catch (err: any) {
      throw new RunError(`Failed to refresh run ${this.id}`, err);
    }
  }

  /**
   * Private: returns a typed representation of this run.
   * Possibly used internally for debugging or logging.
   */
  private getValues() {
    return {
      id: this.id,
      type: this.type,
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
   * (Internal Use Only)
   * Called by Flow.getRunResults() to retrieve the "schema_transform" step's final output.
   * We do not expose "SchemaTransformer" to the user directly.
   */
  public async _getTransformationOutput(
    page: number = 1,
    size: number = 50
  ): Promise<SchemaTransformerOutput | null> {
    // We rely on a "schema_transform" step existing in the steps array.
    if (!this.steps || this.steps.length < 1) {
      return null;
    }
    // For demonstration, we assume the second-to-last step is the schema transform,
    // as in your original code:
    const schemaTransformStep = this.steps[this.steps.length - 2];
    if (
      !schemaTransformStep ||
      schemaTransformStep.type !== "schema_transform"
    ) {
      return null;
    }

    // We'll build a private SchemaTransformer instance to fetch the detailed output
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
      this.flow_id,
      this.metadata?.name ?? ""
    );

    try {
      // This hits /schema_transformers/{transformer.id} with page & size.
      await transformer.get({ page, size });
      return transformer.output;
    } catch (err: any) {
      // If there's a transform-level error, throw a RunError with details:
      throw new RunError(
        `Failed to retrieve transformation output from run ${this.id}`,
        err
      );
    }
  }
}

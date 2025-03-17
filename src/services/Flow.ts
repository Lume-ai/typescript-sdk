import { ApiClient } from "./ApiClient";
import { CreateRunDto, SearchRunsDto, Flow as FlowData } from "../models/flow";
import { Run } from "./Run";
import { Status } from "../models/status";
import { Steps } from "../models/shared";
import { Page } from "../models/models";
import { FlowError, RunError } from "../models/LumeError";

/**
 * Represents a data transformation Flow in Lume.
 * You can create multiple runs, fetch them, or do a quick "process" method.
 */
export class Flow {
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

  private apiClient!: ApiClient;

  constructor(apiClient: ApiClient, data: FlowData) {
    Object.defineProperty(this, "apiClient", {
      value: apiClient,
      enumerable: false,
      writable: true,
      configurable: true,
    });

    this.id = data.id;
    this.user_id = data.user_id;
    this.version = data.version;
    this.tags = data.tags.map((tag) => `${tag.key}:${tag.value}`);
    this.description = data.description;
    this.steps = data.steps;
    this.name = data.name;
    this.status = data.status;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  /**
   * Refreshes the flow's data from the API.
   */
  public async get(): Promise<void> {
    let flowData: FlowData;
    try {
      flowData = await this.apiClient.get<FlowData>(`/flows/${this.id}`);
    } catch (err: any) {
      throw new FlowError(err, `Failed to refresh flow with ID ${this.id}`, this.id);
    }
    this.version = flowData.version;
    this.tags = flowData.tags.map((tag) => `${tag.key}:${tag.value}`);
    this.description = flowData.description;
    this.steps = flowData.steps;
    this.name = flowData.name;
    this.status = flowData.status;
    this.created_at = flowData.created_at;
    this.updated_at = flowData.updated_at;
  }

  /**
   * Creates a new run of this flow with provided data.
   * If wait=true, this method polls until the run is complete.
   */
  public async createRun(
    data: CreateRunDto,
    wait: boolean = false
  ): Promise<Run> {
    let newRunData: any;
    try {
      newRunData = await this.apiClient.post<any>(
        `/flows/${this.id}/runs`,
        data
      );
    } catch (err: any) {
      throw new FlowError(err, `Failed to create run for flow ${this.id}`, this.id);
    }

    const run = new Run(this.apiClient, newRunData, this.id);
    if (wait) {
      await run.waitForCompletion();
    }
    return run;
  }

  /**
   * Fetches a specific run by run ID from this flow.
   */
  public async getRun(run_id: string): Promise<Run> {
    let response: any;
    try {
      // The server expects run_id as a param for the same /flows/{id} endpoint.
      response = await this.apiClient.get<any>(`/flows/${this.id}`, {
        params: { run_id },
      });
    } catch (err: any) {
      throw new RunError(err, `Failed to get run ${run_id} for flow ${this.id}`, run_id, this.id);
    }
    return new Run(this.apiClient, response, this.id, run_id);
    
  }

  /**
   * Fetches all runs for this flow.
   */
  public async getRuns(page: number = 1, size: number = 50): Promise<Page<Run>> {
    let response: Page<Run>;
    try {
      response = await this.apiClient.get<Page<Run>>(
        `/flows/${this.id}/runs`,
        {
          params: {
            page,
            size
          }
        }
      );
    } catch (err: any) {
      throw new FlowError(err, `Failed to get runs for flow ${this.id}`, this.id);
    }
    return {
      items: response.items.map((runData) => new Run(this.apiClient, runData, this.id)),
      total: response.total,
      page,
      size,
      pages: response.pages
    };
    
  }

  /**
   * Searches for runs by name, tags_filter, and version_id
   */
  public async searchRuns(
    searchDto: SearchRunsDto,
    page: number = 1,
    size: number = 50
  ): Promise<Page<Run>> {
    let response: Page<Run>;
    try {
      response = await this.apiClient.post<Page<Run>>(`/flows/${this.id}/runs/search`, searchDto, {
        params: {
        page,
        size
      }
    });
    } catch (err: any) {
      throw new FlowError(err, `Failed to search runs for flow ${this.id}`, this.id);
    }
    return {
      items: response.items.map((runData) => new Run(this.apiClient, runData, this.id)),
      total: response.total,
      page,
      size,
      pages: response.pages
    };
  }
  

  /**
   * High-level method: processes new data through this flow,
   * waits for the run to complete, and returns the final mapped results.
   */
  public async process(
    sourceData: any[],
    page: number = 1,
    size: number = 50
  ): Promise<Page<any>> {
    // 1) Create and wait for run
    const run = await this.createRun({ source_data: sourceData }, true);
    // 2) Use a private or internal method to retrieve the final data from the run
    return this.getRunResults(run, page, size);
  }

  /**
   * Gets results from a specific run with pagination.
   * Internally calls run.getSchemaTransformerOutput,
   * which is where the real step logic is hidden.
   */
  public async getRunResults(
    run: Run,
    page: number = 1,
    size: number = 50
  ): Promise<Page<any>> {
    const output = await run._getTransformationOutput(page, size);
    // The shape of output?.mapped_data is { items: [...], total: number }
    // Provide a default if null
    return output?.mapped_data || { items: [], total: 0 };
  }

  /**
   * A new method that directly fetches run results by run ID.
   * Useful in concurrency scenarios: you always fetch the exact run you want.
   */
  public async getRunResultsById(
    runId: string,
    page: number = 1,
    size: number = 50
  ): Promise<Page<any>> {
    const run = await this.getRun(runId);
    return this.getRunResults(run, page, size);
  }

  /**
   * Gets the results from the most recent successful run,
   * or null if none exist.
   */
  public async getLatestRunResults(
    page: number = 1,
    size: number = 50
  ): Promise<Page<any> | null> {
    const runs = await this.getRuns();
    if (runs?.total === 0) return null;

    // Find the most recent successful run
    const latestSuccessfulRun = runs.items.find(
      (r) => r.status === Status.SUCCEEDED
    );
    if (!latestSuccessfulRun) return null;

    const run = await this.getRun(latestSuccessfulRun.id);
    if (!run) return null;

    return this.getRunResults(run, page, size);
  }
}

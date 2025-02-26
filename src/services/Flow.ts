import { ApiClient } from "./ApiClient";
import { CreateRunDto, SearchRunsDto, Flow as FlowData } from "../models/flow";
import { Run } from "./Run";
import { Status } from "../models/status";
import { Steps } from "../models/shared";
import { Page } from "../models/models";
import { FlowError } from "../models/LumeError";

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
   */
  public async get(): Promise<void> {
    try {
      const flowData = await this.apiClient.get<FlowData>(`/flows/${this.id}`);
      this.version = flowData.version;
      this.tags = flowData.tags;
      this.description = flowData.description;
      this.steps = flowData.steps;
      this.name = flowData.name;
      this.status = flowData.status;
      this.created_at = flowData.created_at;
      this.updated_at = flowData.updated_at;
    } catch (err: any) {
      throw new FlowError(`Failed to refresh flow with ID ${this.id}`, err);
    }
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
      throw new FlowError(`Failed to create run for flow ${this.id}`, err);
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
  public async getRun(run_id: string): Promise<Run | undefined> {
    try {
      // The server expects run_id as a param for the same /flows/{id} endpoint.
      const response = await this.apiClient.get<any>(`/flows/${this.id}`, {
        params: { run_id },
      });
      return new Run(this.apiClient, response, this.id);
    } catch (err: any) {
      // Could be 404 or something else
      return undefined;
    }
  }

  /**
   * Fetches all runs for this flow.
   */
  public async getRuns(): Promise<Run[] | undefined> {
    try {
      const response = await this.apiClient.get<any[]>(
        `/flows/${this.id}/runs`
      );
      if (!Array.isArray(response)) {
        return undefined;
      }
      return response.map((runData) => {
        // Ensure steps are properly passed
        const run = new Run(
          this.apiClient,
          { ...runData, steps: runData.steps || [] },
          this.id
        );
        return run;
      });
    } catch (err: any) {
      return undefined;
    }
  }

  /**
   * Searches for runs by name, tags_filter, and version_id
   */
  public async searchRuns(
    searchDto: SearchRunsDto,
    page: number = 1,
    size: number = 50
  ): Promise<Page<Run>> {
    const response = await this.apiClient.post<Page<Run>>(`/flows/${this.id}/runs/search`, searchDto, {
      params: {
        page,
        size
      }
    });
    return {
      items: response.items.map((runData) => new Run(this.apiClient, runData, this.id)),
      total: response.total,
      page,
      size
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
    if (!run) {
      throw new FlowError(`Run with ID ${runId} not found on flow ${this.id}`);
    }
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
    if (!runs?.length) return null;

    // Sort runs by creation date (newest first)
    const sortedRuns = runs.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    // Find the most recent successful run
    const latestSuccessfulRun = sortedRuns.find(
      (r) => r.status === Status.SUCCEEDED
    );
    if (!latestSuccessfulRun) return null;

    const run = await this.getRun(latestSuccessfulRun.id);
    if (!run) return null;

    return this.getRunResults(run, page, size);
  }
}

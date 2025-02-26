import { ApiClient } from "./ApiClient";
import { Flow } from "./Flow";
import { CreateFlowDto, CreateRunDto, SearchFlowsDto, Flow as FlowData } from "../models/flow";
import { Page } from "../models/models";
const throat = require("throat");
import { FlowError } from "../models/LumeError";

/**
 * An optional concurrency or callback-based approach.
 * If concurrency is set, we wrap calls in throat. Otherwise, no limit.
 */
export class FlowService {
  private apiClient: ApiClient;

  private concurrencyLimit: number;
  private requestQueue: ReturnType<typeof throat> | null;

  constructor(apiClient: ApiClient, concurrencyLimit: number = 0) {
    this.apiClient = apiClient;
    this.concurrencyLimit = concurrencyLimit;
    this.requestQueue = concurrencyLimit > 0 ? throat(concurrencyLimit) : null;
  }

  /**
   * Creates a new flow, THEN executes the initial run using runData.
   * If `wait` is true, it waits for that initial run to finish.
   *
   * Some users prefer a single call so that no flow is created without data.
   */
  public async createAndRunFlow(
    flowData: CreateFlowDto,
    runData: CreateRunDto,
    wait: boolean = false
  ): Promise<Flow> {
    const executor = async () => {
      // 1) Create flow
      let flowObj: FlowData;
      try {
        flowObj = await this.apiClient.post<FlowData>("/flows", flowData);
      } catch (err: any) {
        // More specific error messages based on the type of error
        if (!err.response) {
          throw new FlowError(
            "Network error while creating flow - please check your connection and API endpoint configuration.",
            err
          );
        }

        if (err.code === 401) {
          throw new FlowError(
            "Authentication failed - please check your API key.",
            err
          );
        }

        if (err.code === 404) {
          throw new FlowError(
            "API endpoint not found - please check your API configuration.",
            err
          );
        }

        // If we have a response but it's an error
        if (err.response?.data) {
          throw new FlowError(
            `Failed to create flow: ${
              err.response.data.message || err.message
            }`,
            err
          );
        }

        // Fallback
        throw new FlowError(
          "Failed to create flow - please check your configuration and try again.",
          err
        );
      }

      const flow = new Flow(this.apiClient, flowObj);

      // 2) Create initial run
      try {
        await flow.createRun(runData, wait);
      } catch (err: any) {
        throw new FlowError("Failed to create initial run for new flow.", err);
      }

      return flow;
    };

    if (this.requestQueue) {
      // If concurrency limit is set, enqueue it
      return this.requestQueue(executor);
    }
    // Otherwise just run directly
    return executor();
  }

  /**
   * Retrieves a flow by ID.
   */
  public async getFlow(id: string): Promise<Flow> {
    if (!id) throw new Error("Flow ID is required");
    try {
      const flowData = await this.apiClient.get<FlowData>(`/flows/${id}`);
      return new Flow(this.apiClient, flowData);
    } catch (err: any) {
      throw new FlowError(`Failed to retrieve flow ID: ${id}`, err);
    }
  }

  /**
   * Creates a new flow without an initial run (less common),
   * but you can still do `flow.createRun(...)` after.
   */
  public async createFlow(data: CreateFlowDto): Promise<Flow> {
    try {
      const flowData = await this.apiClient.post<FlowData>("/flows", data);
      return new Flow(this.apiClient, flowData);
    } catch (err: any) {
      throw new FlowError("Failed to create flow.", err);
    }
  }

  /**
   * Retrieves all flows.
   */
  public async getFlows(page: number = 1, size: number = 50): Promise<Page<Flow>> {
    const response = await this.apiClient.get<Page<FlowData>>("/flows", {
      params: {
        page,
        size
      }
    });
    return {
      items: response.items.map((flow) => new Flow(this.apiClient, flow)),
      total: response.total,
      page,
      size,
      pages: response.pages
    };
  }

  /**
   * Searches for flows by name or tags_filter.
   */
  public async searchFlows(
    searchDto: SearchFlowsDto,
    page: number = 1,
    size: number = 50
  ): Promise<Page<Flow>> {
    const response = await this.apiClient.post<Page<FlowData>>("/flows/search", searchDto, {
      params: {
        page, 
        size
      }
    });
    return {
      items: response.items.map((flow) => new Flow(this.apiClient, flow)),
      total: response.total,
      page,
      size,
      pages: response.pages
    };
  }
  
}

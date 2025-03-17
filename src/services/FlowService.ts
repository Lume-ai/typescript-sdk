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
        throw new FlowError(err, "Failed to create flow.");
      }

      const flow = new Flow(this.apiClient, flowObj);

      // 2) Create initial run
      await flow.createRun(runData, wait);
      
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
    let flowData: FlowData;
    try {
      flowData = await this.apiClient.get<FlowData>(`/flows/${id}`);
    } catch (err: any) {
      throw new FlowError(err, `Failed to retrieve flow ID: ${id}`, id);
    }
    return new Flow(this.apiClient, flowData);
  }

  /**
   * Creates a new flow without an initial run (less common),
   * but you can still do `flow.createRun(...)` after.
   */
  public async createFlow(data: CreateFlowDto): Promise<Flow> {
    let flowData: FlowData;
    try {
      flowData = await this.apiClient.post<FlowData>("/flows", data);
    } catch (err: any) {
      throw new FlowError(err, "Failed to create flow.");
    }
    return new Flow(this.apiClient, flowData);
  }

  /**
   * Retrieves all flows.
   */
  public async getFlows(page: number = 1, size: number = 50): Promise<Page<Flow>> {
    let response: Page<FlowData>;
    try {
      response = await this.apiClient.get<Page<FlowData>>("/flows", {
        params: {
          page,
          size
      }
    });
    } catch (err: any) {
      throw new FlowError(err, "Failed to retrieve flows.");
    }
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
    let response: Page<FlowData>;
    try {
      response = await this.apiClient.post<Page<FlowData>>("/flows/search", searchDto, {
        params: {
          page, 
        size
      }
    });
    } catch (err: any) {
      throw new FlowError(err, "Failed to search flows.");
    }
    return {
      items: response.items.map((flow) => new Flow(this.apiClient, flow)),
      total: response.total,
      page,
      size,
      pages: response.pages
    };
  }
  
}

// services_v3/FlowService.ts

import { ApiClient } from "./ApiClient";
import { Flow } from "./Flows";
import { CreateFlowDto, CreateRunDto, Flow as FlowData } from "../models/flow";
import { Status } from "..";
import { SchemaTransformer } from "./SchemaTransformer";
import {
  SchemaTransformerInput,
  SchemaTransformerOutput,
} from "../models/schemaTransform";

export class FlowService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  /**
   * Creates and executes a flow, returning the processed data
   */
  public async createAndRunFlow(
    flowData: CreateFlowDto,
    runData: CreateRunDto,
    wait: boolean = false
  ): Promise<Flow> {
    const flow = await this.createFlow(flowData);
    await flow.createRun(runData, wait);
    return flow;
  }

  /**
   * Retrieves a flow by ID
   */
  public async getFlow(id: string): Promise<Flow> {
    if (!id) throw new Error("Flow ID is required");
    const flowData = await this.apiClient.get<FlowData>(`/flows/${id}`);
    return new Flow(this.apiClient, flowData);
  }

  /**
   * Creates a new flow.
   * @param data The data for creating the flow.
   * @returns The created Flow instance.
   */
  public async createFlow(data: CreateFlowDto): Promise<Flow> {
    const flowData = await this.apiClient.post<FlowData>("/flows", data);
    return new Flow(this.apiClient, flowData);
  }
}

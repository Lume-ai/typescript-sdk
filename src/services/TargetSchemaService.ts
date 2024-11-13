import { ApiClient } from "./ApiClient";
import { Schema, TargetSchema, TargetSchemaCreate, TargetSchemaUpdate } from "../models/Schema";
import { Page } from "../models/models";
import { HTTPExceptionError } from '../models/Error';
import { formatHTTPExceptionError } from '../utils/errorUtils';
import { IncludeResource } from "../models";

/**
 * Service class for target schema usage.
 */
export class TargetSchemaService {
    private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }
    public async getTargetSchema(id: string, include?: IncludeResource[]): Promise<Schema> {
      const targetSchema = await this.apiClient.get<Schema>(`/target_schemas/${id}`, { params: { include } });
      return targetSchema;
    }
  
    public async getTargetSchemas(
      page: number = 1,
      size: number = 50
    ): Promise<Page<TargetSchema>> {
      const targetSchemaPage = await this.apiClient.get<Page<TargetSchema>>(`/target_schemas`, { params: { page, size } });
      return targetSchemaPage;
    }
  
    public async createTargetSchema(
      data: TargetSchemaCreate
    ): Promise<TargetSchema> {
      return this.apiClient.post<TargetSchema>(`/target_schemas`, data);
    }
  
    public async deleteTargetSchema(id: string): Promise<TargetSchema> {
      return this.apiClient.delete<TargetSchema>(`/target_schemas/${id}`);
    }
  
    public async updateTargetSchema(id: string, data: TargetSchemaUpdate): Promise<TargetSchema> {
      return this.apiClient.patch<TargetSchema>(`/target_schemas/${id}`, data);
  }
}
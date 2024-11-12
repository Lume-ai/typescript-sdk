import { ApiClient } from "./ApiClient";
import { Schema, TargetSchema } from "../models/Schema";
import { Page } from "../models/models";
import { HTTPExceptionError } from '../models/Error';
import { formatHTTPExceptionError } from '../utils/errorUtils';

/**
 * Service class for target schema usage.
 */
export class TargetSchemaService {
    private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }
    public async getTargetSchema(id: string): Promise<Schema> {
      const targetSchema = await this.apiClient.get<Schema>(`/target_schemas/${id}`);
      return targetSchema;
    }
  
    public async getTargetSchemaDataPage(
      page: number = 1,
      size: number = 50
    ): Promise<Page<TargetSchema>> {
      const targetSchemaPage = await this.apiClient.get<Page<TargetSchema>>(`/target_schemas`, { params: { page, size } });
      return targetSchemaPage;
    }
  
    public async createTargetSchema(
      name: string,
      filename: string,
      schema: Schema
    ): Promise<TargetSchema> {
        return this.apiClient.post<TargetSchema>(`/target_schemas`, {
          name: name,
          filename: filename,
          schema: schema,
        });
    }
  
    public async deleteTargetSchema(id: string): Promise<void> {
      return this.apiClient.delete<void>(`/target_schemas/${id}`);
    }
  
    public async getTargetSchemaWithDetails(id: string): Promise<TargetSchema> {
      return this.apiClient.get<TargetSchema>(`/target_schemas/${id}/object`);
    }
  
    public async updateTargetSchema(id: string, schema: Schema): Promise<TargetSchema> {
      return this.apiClient.patch<TargetSchema>(`/target_schemas/${id}/update`, {schema});
  }
}
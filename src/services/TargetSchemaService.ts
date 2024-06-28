//services/TargetSchemaService.ts
import { FileResult } from "../models/FileResult";
import { Schema } from "../models/Schema";
import { TargetSchema } from "../models/TargetSchema";
import { PaginatedResponse } from "../types/pagination";
import { BaseService } from "./BaseService";

/**
 * Service class for target schema usage.
 */
export class TargetSchemaService extends BaseService {
  /**
   * Constructs a new instance of TargetSchemaService.
   * @param apiKey The API key used for authentication.
   * @param baseUrl The base URL for the API (optional).
   */
  constructor(apiKey: string, baseUrl?: string) {
    super(apiKey, baseUrl);
  }

  public async getTargetSchema(id: string): Promise<Schema> {
    return this.get<Schema>(`/target_schemas/${id}`);
  }

  public async getTargetSchemaDataPage(
    page: number = 1,
    size: number = 50
  ): Promise<PaginatedResponse<TargetSchema>> {
    return this.fetchPaginatedData<TargetSchema>(`/target_schemas`, page, size);
  }

  public async createTargetSchema(
    name: string,
    fileName: string,
    schema: Schema
  ): Promise<TargetSchema> {
    return this.post<TargetSchema>(`/target_schemas`, {
      name: name,
      fileName: fileName,
      target_schema: schema,
    });
  }

  public async deleteTargetSchema(id: string): Promise<void> {
    return this.delete<void>(`/target_schemas/${id}`);
  }
}

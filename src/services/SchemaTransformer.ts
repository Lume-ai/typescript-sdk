import { Status } from "../models/status";
import {
  SchemaTransformer as SchemaTransformerData,
  SchemaTransformerInput,
  SchemaTransformerOutput,
  SchemaTransformerTargetField,
} from "../models/schemaTransform";
import { ApiClient } from "./ApiClient";

/**
 * INTERNAL/PRIVATE to handle the "schema_transform" step.
 * The user never calls SchemaTransformer directly.
 */
export class SchemaTransformer {
  public edit?: { id: string; status: Status };
  public input: SchemaTransformerInput;
  public output: SchemaTransformerOutput;
  public target_fields: SchemaTransformerTargetField[];

  public id!: string;
  public type: string;
  public status: Status;
  public created_at: string;
  public updated_at: string;
  public user_id: string;
  public flow_id: string;
  public name: string;

  private apiClient!: ApiClient;

  constructor(
    apiClient: ApiClient,
    id: string,
    type: string,
    status: Status,
    created_at: string,
    updated_at: string,
    user_id: string,
    input: SchemaTransformerInput,
    output: SchemaTransformerOutput,
    target_fields: SchemaTransformerTargetField[],
    flow_id: string,
    name: string,
    edit?: { id: string; status: Status }
  ) {
    Object.defineProperty(this, "apiClient", {
      value: apiClient,
      enumerable: false,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(this, "id", {
      value: id,
      enumerable: false,
      writable: true,
      configurable: true,
    });

    this.type = type;
    this.status = status;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.user_id = user_id;
    this.input = input;
    this.output = output;
    this.target_fields = target_fields;
    this.edit = edit || undefined;
    this.flow_id = flow_id;
    this.name = name;
  }

  /**
   * Refreshes the schema transformer details with the latest data from the API,
   * including the output (mapped_data, errors, etc.).
   */
  public async get(
    options: { page?: number; size?: number } = {},
    revalidate?: boolean
  ): Promise<void> {
    const { page = 1, size = 50 } = options;
    const headers = revalidate
      ? {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        }
      : {};

    // GET /schema_transformers/{this.id}?page=X&size=Y&validation=true&target_fields=false
    const updatedData = await this.apiClient.get<SchemaTransformer>(
      `/schema_transformers/${this.id}`,
      {
        params: {
          page,
          size,
          validation: true,
          target_fields: false,
        },
        headers,
      }
    );

    this.type = updatedData.type;
    this.status = updatedData.status;
    this.created_at = updatedData.created_at;
    this.updated_at = updatedData.updated_at;
    this.user_id = updatedData.user_id;
    this.input = updatedData.input;
    this.output = updatedData.output;
    this.target_fields = updatedData.target_fields;
    this.edit = updatedData.edit;
    this.flow_id = updatedData.flow_id;
    this.name = updatedData.name;
  }

  /**
   * Returns the raw data model, if needed internally for debugging.
   */
  public async getValues(): Promise<SchemaTransformerData> {
    return {
      id: this.id,
      type: this.type,
      status: this.status,
      created_at: this.created_at,
      updated_at: this.updated_at,
      user_id: this.user_id,
      flow_id: this.flow_id,
      edit: this.edit,
      input: this.input,
      output: this.output,
      target_fields: this.target_fields,
    };
  }
}

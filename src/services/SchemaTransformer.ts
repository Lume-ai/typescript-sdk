import { Status } from "../models/status";
import {
  SchemaTransformerInput,
  SchemaTransformerOutput,
  SchemaTransformerTargetField,
  SchemaTransformer as SchemaTransformerData,
} from "../models/schemaTransform";
import { ApiClient } from "./ApiClient";

export class SchemaTransformer {
  // edit?: {
  //   id: string
  //   status: TargetFieldStatus
  // }
  // input: Input
  // output: SchemaTransformerOutput
  // target_fields: TargetField[]
  public edit?: {
    id: string;
    status: Status;
  };
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
    edit?: {
      id: string;
      status: Status;
    }
  ) {
    // Define 'apiClient' as a non-enumerable property
    Object.defineProperty(this, "apiClient", {
      value: apiClient,
      enumerable: false, // Makes the property non-enumerable
      writable: true, // Allows the property to be modified if needed
      configurable: true, // Allows the property to be reconfigured or deleted
    });

    // Define 'pipeline_id' as a non-enumerable property
    Object.defineProperty(this, "id", {
      value: id,
      enumerable: false, // Makes the property non-enumerable
      writable: true, // Allows the property to be modified if needed
      configurable: true, // Allows the property to be reconfigured or deleted
    });

    this.user_id = user_id;
    this.type = type;
    this.status = status;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.input = input;
    this.output = output;
    this.target_fields = target_fields;
    this.edit = edit || undefined;
    this.flow_id = flow_id;
    this.name = name;
  }

  /**
   * Refreshes the SchemaTransformer instance with the latest data from the API.
   */
  public async get(
    options: { page?: number; size?: number } = {},
    revalidate?: boolean
  ): Promise<void> {
    const { page = 1, size = 50 } = options;

    const updatedData = await this.apiClient.get<SchemaTransformer>(
      `/schema_transformers/${this.id}`,
      {
        params: {
          page,
          size,
          validation: true,
          target_fields: false,
        },
        headers: revalidate
          ? {
              "Cache-Control": "no-cache, no-store, must-revalidate",
              Pragma: "no-cache",
              Expires: "0",
            }
          : {},
      }
    );

    // Update instance properties with new data
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

  // get just the mapper data
  public async getValues(): Promise<SchemaTransformerData> {
    return {
      id: this.id,
      type: this.type,
      status: this.status,
      created_at: this.created_at,
      updated_at: this.updated_at,
      user_id: this.user_id,
      input: this.input,
      output: this.output,
      target_fields: this.target_fields,
      edit: this.edit,
      name: this.name,
      flow_id: this.flow_id,
    };
  }
}

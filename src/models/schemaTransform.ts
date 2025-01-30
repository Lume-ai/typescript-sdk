import { BaseModel } from "./shared";
import { Status } from "./status";

export interface SchemaTransformerInput {
  source_data: {
    items: Array<Record<string, any>>;
    pages: number;
    page: number;
    size: number;
    total: number;
  };
  target_schema: TargetSchema;
}

export interface SchemaTransformerTargetField {
  id: string;
  schemaId?: string;
  name: string;
  status: Status;
  type: string | string[];
  edit?: {
    updated_at: string;
    id: string;
    status: Status;
  };
  updated_at: string;
}

// New interfaces for the updated error structure
export interface ErrorStats {
  error_count: number;
  null_count: number;
  total_count: number;
  missing_count: number;
}

export interface SampleItem {
  index: number;
  value: any;
}

export interface ValidationErrorDetail {
  error_type:
    | "pattern"
    | "required"
    | "type"
    | "custom"
    | "unknown"
    | "enum"
    | "array"
    | "duplicate"
    | "unsupported"
    | "unsupported_type"
    | "unsupported_enum"
    | "unsupported_array"
    | "unsupported_duplicate"
    | "unsupported_custom"
    | "unsupported_unknown";
  statistics: ErrorStats;
  schema_path: string;
  error_sample: SampleItem[];
  check: any;
}

// Recursive type for nested validation errors
export interface ValidationTree {
  [pathSegment: string]: ValidationErrorDetail[] | ValidationTree;
}

export interface SchemaTransformerOutput {
  mapped_data: {
    items: Array<Record<string, any>>;
  };
  no_data_idxs?: number[];
  errors?: ValidationTree;
}

export interface TargetSchema {
  type: string;
  properties: Record<string, any>;
  required: string[];
}

export interface SchemaTransformer extends BaseModel {
  edit?: {
    id: string;
    status: Status;
  };
  input: SchemaTransformerInput;
  output: SchemaTransformerOutput;
  target_fields: SchemaTransformerTargetField[];
}

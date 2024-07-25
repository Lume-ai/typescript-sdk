interface FieldError {
  error_message: string;
  error_type: string;
}

interface RecordErrors {
  [field: string]: FieldError;
}

export interface GlobalErrorDetail {
  error_message: string;
  error_indices: number[];
  error_fields: string[];
}

export interface GlobalErrors {
  error_types: {
    [key: string]: GlobalErrorDetail[];
  };
}

export type ValidationErrorSchema = {
  record_errors: RecordErrors;
  global_errors: GlobalErrors;
};

export namespace ValidationErrorSchema {
  /**
   * An object that displays the error of the mapping
   */
  export enum errorType {
    TYPE_ERROR = "Type Error",
    UNIQUE_ERROR = "Unique Error",
    SCHEMA_ERROR = "Schema Error",
  }
}

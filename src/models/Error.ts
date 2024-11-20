// ValidationError.ts
import { UUID } from "./models";

/**
 * Represents an HTTP validation error response containing an array of validation errors
 */
export interface HTTPValidationError {
    detail?: ValidationError[];
  }

export interface HTTPExceptionError {
    code: number;
    message: string;
    error_id?: UUID | null;
  }
  
/**
 * Represents a specific field-level error with message and type
 */
  interface FieldError {
    error_message: string;
    error_type: string;
  }
  
/**
 * Maps field names to their corresponding validation errors
 */
  interface RecordErrors {
    [field: string]: FieldError;
  }
  
/**
 * Contains details about a global validation error including affected indices and fields
 */
  export interface GlobalErrorDetail {
    error_message: string;
    error_indices: number[];
    error_fields: string[];
  }
  
/**
 * Groups global validation errors by error type
 */
  export interface GlobalErrors {
    error_types: {
      [key: string]: GlobalErrorDetail[];
    };
  }
  
/**
 * Complete validation error schema containing both record-level and global errors
 */
  export type ValidationErrorSchema = {
    record_errors: RecordErrors;
    global_errors: GlobalErrors;
  };
  
/**
 * Namespace containing validation error related enums and types
 */
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
  
/**
 * Represents a single validation error with location, message and type information
 */
  export interface ValidationError {
    loc: Array<string | number>;
    msg: string;
    type: string;
  }
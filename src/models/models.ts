// models.ts

import { ValidationErrorSchema } from "./Error";
import { Mapper } from "./Mapper";
import { LookupItem } from "./Lookup";
import { Conditional } from "./Transformation";
  
  
  
  
  
  
  export interface Page<T> {
    items: T[];
    total?: number | null;
    page?: number | null;
    size?: number | null;
    pages?: number | null;
  }
  
  export interface Dependency {
    source_properties?: string[];
    default_values?: any[];
  }
  
  export enum Status {
    QUEUED = 'QUEUED',
    RUNNING = 'RUNNING',
    FINISHED = 'FINISHED',
    FAILED = 'FAILED',
    NEEDS_REVIEW = 'NEEDS REVIEW',
  }
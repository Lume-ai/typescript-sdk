// Pipeline.ts

import { Mapper } from "./Mapper";
import { Status } from "./models";

export interface Pipeline {
    id: string;
    user_id: string;
    name: string;
    description?: string | null;
    last_run_status?: Status | null;
    mapper: Mapper;
  }
  
  export interface PipelineCreate {
    name: string;
    description?: string | null;
    target_schema: object | string;
    sample_data: object[] | string;
  }
  
  export interface PipelineEdit {
    name?: string | null;
    description?: string | null;
    mapper_version?: number | null;
  }
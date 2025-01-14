// Pipeline.ts

import { Mapper } from "./Mapper";
import { Status, UUID } from "./models";

export interface Pipeline {
    id: UUID;
    user_id: UUID;
    name: string;
    description?: string | null;
    last_run_status?: Status | null;
    mapper: Mapper;
  }
  
  export interface PipelineCreate {
    name: string;
    description?: string | null;
    target_schema: object | UUID;
    sample_data: object[] | UUID;
  }
  
  export interface PipelineEdit {
    name?: string | null;
    description?: string | null;
    mapper_version?: number | null;
  }

  export interface PipelineSimple {
    name: string;
    description?: string | null;
  } 

  

  export interface PipelineClone {
    id: UUID;
  }

// Run.ts

import { Status, UUID } from "./models";
import { Mapper } from "./Mapper";
import { PageMapping } from "./Mapping";
export interface Run {
    number: number;
    user_id: UUID;        
    status: Status;
    mapper?: Mapper | null;
    mappings?: PageMapping | null;
  }
  
  export interface RunCreate {
    data: object[] | UUID;
    mapper_id?: number | null;
  }
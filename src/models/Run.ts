// Run.ts

import { Status } from "./models";
import { Mapper } from "./Mapper";
import { PageMapping } from "./Mapping";
export interface Run {
    number: number;
    user_id: string;        
    status: Status;
    mapper?: Mapper | null;
    mappings?: PageMapping | null;
  }
  
  export interface RunCreate {
    data: object[] | string;
    mapper_id?: number | null;
  }
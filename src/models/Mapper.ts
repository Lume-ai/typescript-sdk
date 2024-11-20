// Mapper.ts

import { Status, UUID } from "./models";
import { Transformation } from "./Transformation";
import { PageManifestItem } from "./Manifest";

export interface Mapper {
    version: number;
    user_id: UUID;
    creation_status: Status;
    target_schema?: object | null;
    transformations?: Transformation[] | null;
    manifest?: PageManifestItem | null;
  }
  
  export interface MapperCreate {
    global_edit?: GlobalEdit | null;
    field_edits?: FieldEdit[] | null;
    sample_data?: object[] | string | null;
    base_version?: number | null;
  }
  
  export interface GlobalEdit {
    source_context: string;
  }
  
  export interface FieldEdit {
    field_name: string;
    sample?: Sample | null;
    schema?: object | null;
    transformation?: Transformation | null;
  }
  
  export interface Sample {
    source_record: object;
    mapped_record: object;
  }

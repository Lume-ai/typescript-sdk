import { Schema } from "./Schema";
import { BoolFilter, TagFilter } from "./Tags";
import { BaseModel, Steps } from "./shared";

export interface Flow extends BaseModel {
  name: string;
  version: number;
  tags: Tag[];
  description: string;
  steps: Steps[];
} 

export interface Tag {
  key: string;
  value: string;
}

export interface CreateFlowDto {
  name: string;
  description?: string;
  target_schema: Schema;
  tags?: Tag[];
}

export interface SearchFlowsDto {
  name?: string;
  tags_filter?: BoolFilter<TagFilter>;
}

export interface SearchRunsDto {
  name?: string;
  tags_filter?: BoolFilter<TagFilter>;
  version_id?: string;
}

export interface Run extends BaseModel {
  metadata: any;
  steps?: Steps[];
  runId?: string;
  file_name?: string;
}

export interface CreateRunDto {
  source_data: any[];
}

export interface CreateDataJoinRunDto {
  files: File[];
  topSheetName: string;
  name: string;
  metadata?: RelationshipDefinition;
}

export interface RelationshipDefinition {
  [tableName: string]: {
    primary_key: string[];
    foreign_keys: { [foreignKeyColumn: string]: string }; // column -> references which table
  };
}

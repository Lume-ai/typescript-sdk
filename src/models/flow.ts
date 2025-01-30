import { Schema } from "./schema";
import { BaseModel, Steps } from "./shared";

export interface Flow extends BaseModel {
  version: number;
  tags: string[];
  description: string;
  steps: Steps[];
}

export interface CreateFlowDto {
  name: string;
  description: string;
  target_schema: Schema;
  tags: string[];
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

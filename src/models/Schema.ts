// Schema.ts

import { UUID } from "./models";

/**
 * Schema alias for Record<string, any>
 */

export type Schema = Record<string, any>;

/**
 * TargetSchema type
 */
export type TargetSchema = {
    /**
     * The id of the target schema.
     */
    readonly id: UUID;

    /**
     * The user id of the target schema.
     */
    readonly user_id: UUID;
  
    /**
     * The name of the target schema.
     */
    readonly name: string | null;
  
    /**
     * The file name of the target schema.
     */
    readonly filename: string | null;
  
    /**
     * The schema of the target schema.
     */
    readonly schema?: Schema | null;
  };
  

  export type TargetSchemaCreate = {
    name: string;
    filename?: string;
    schema: Schema;
  };

  export type TargetSchemaUpdate = {
    name?: string;
    filename?: string;
    schema?: Schema;
  };
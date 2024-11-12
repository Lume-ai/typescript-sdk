// Schema.ts

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
    readonly id: string;
  
    /**
     * The name of the target schema.
     */
    readonly name: string;
  
    /**
     * The file name of the target schema.
     */
    readonly filename: string;
  
    /**
     * The schema of the target schema.
     */
    readonly schema?: Schema;
  };
  
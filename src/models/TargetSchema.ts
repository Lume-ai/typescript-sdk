import { Schema } from "./Schema";

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

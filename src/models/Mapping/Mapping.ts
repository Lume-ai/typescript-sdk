import { ValidationErrorSchema } from "./ValidationErrorSchema";

/**
 * An object that displays the mapped record of the data from the job
 */
export type Mapping = {
  /**
   * The index of the record in the data
   */
  index: number;

  /**
   * The source record of the data.
   */
  source_record: Record<string, any>;

  /**
   * The target record of the data
   */
  mapped_record: Record<string, any>;

  /**
   * The message of the mapping
   */
  message: "success" | ValidationErrorSchema;
};

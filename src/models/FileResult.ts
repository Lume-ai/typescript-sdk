/**
 * An object that represents a result of a processed file.
 */
export type FileResult = {
  /**
   * The unique identifier of this object
   **/
  readonly id: string;

  /**
   * The name of the file
   **/
  readonly name: string;

  /**
   * The status of the file processing task
   **/
  readonly status: FileResult.status;

  /**
   * The date and time this object was created
   **/
  readonly created_at: string;

  /**
   * The date and time this object was updated
   **/
  readonly updated_at: string;

  /**
   * The data of the file
   **/
  readonly data: any;
};

export namespace FileResult {
  /**
   * The status of the file processing task
   */

  export enum status {
    QUEUED = "queued",
    STARTED = "started",
    PENDING = "pending",
    SUCCESS = "success",
    FAILURE = "failure",
  }
}

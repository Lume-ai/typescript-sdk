/**
 * An object that displays the result of a mapping task. This stores all relevant object ids and the status of the mapping task.
 */
export type Result = {
  /**
   * The unique identifier of this object
   */
  readonly id: string;
  /**
   * The date and time this object was created
   */
  readonly created_at: string;
  /**
   * The status of the mapping task
   */
  readonly status: Result.status;
};

export namespace Result {
  /**
   * The status of the mapping task
   */
  export enum status {
    CREATED = "created",
    RUNNING = "running",
    FINISHED = "finished",
    FAILED = "failed",
    NEEDS_REVIEW = "needs review",
    QUEUED = "queued",
  }
}

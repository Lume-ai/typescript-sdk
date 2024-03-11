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
   * The id of the job the result is associated with
   */
  readonly job_id: string | null;
  /**
   * The id of the workshop the result is associated with
   */
  readonly workshop_id: string | null;
  /**
   * The id of the pipeline the result is associated with
   */
  readonly pipeline_id: string;
  /**
   * The status of the mapping task
   */
  readonly status: Result.status;
  /**
   * The date and time this object was last updated
   */
  readonly updated_at: string | null;
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
    NEEDS_REVIEW = "needs_review",
  }
}

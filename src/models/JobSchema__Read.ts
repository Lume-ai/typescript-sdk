/**
 * A job is a task that transforms the provided data with a mapper and to a target schema of its pipeline.
 */
export type JobSchema__Read = {
    /**
     * The unique identifier of this object
     */
    readonly id: string;
    /**
     * The date and time this object was created
     */
    readonly created_at: string;
    /**
     * The id of the pipeline the job is associated with
     */
    readonly pipeline_id: string;
};


/**
 * A job runs the pipeline with newly provided source data. If the pipeline has no mapper, it will generated it. If it has a mapper, it will use the existing mapper.
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


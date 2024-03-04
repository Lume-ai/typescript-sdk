/**
 * A Workshop is a session that allows you to edit the pipeline and mapper.
 */
export type WorkshopSchema__Read = {
    /**
     * The unique identifier of this object
     */
    readonly id: string;
    /**
     * The date and time this object was created
     */
    readonly created_at: string;
    /**
     * The id of the job the Workshop is associated with
     */
    readonly job_id: string;
    /**
     * The id of the pipeline the Workshop is associated with
     */
    readonly pipeline_id: string;
    /**
     * The status of the Workshop
     */
    readonly status: WorkshopSchema__Read.status;
    /**
     * The date and time this object was last updated
     */
    readonly updated_at: (string | null);
};
export namespace WorkshopSchema__Read {
    /**
     * The status of the Workshop
     */
    export enum status {
        CREATED = 'created',
        RUNNING = 'running',
        FINISHED = 'finished',
        FAILED = 'failed',
    }
}


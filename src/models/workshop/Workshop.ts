/**
 * A Workshop is a session that allows you to edit the pipeline and mapper.
 */
export type Workshop = {
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
    readonly status: Workshop.status;
    /**
     * The date and time this object was last updated
     */
    readonly updated_at: (string | null);
};
export namespace Workshop {
    /**
     * The status of the Workshop.  
     * If workshop edits were deployed, status will be deployed. If not, it will have the status from the most recent result"
     */
    export enum status {
        CREATED = 'created',
        RUNNING = 'running',
        FINISHED = 'finished',
        DEPLOYED = 'deployed',
        FAILED = 'failed',
        NEEDS_REVIEW = 'needs review',
    }
}


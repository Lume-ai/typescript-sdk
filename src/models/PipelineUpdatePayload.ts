/**
 * Pipeline update payload, to edit the name or description.
 */
export type PipelineUpdatePayload = {
    /**
     * The name of the pipeline. Must be unique within the organization.
     */
    name?: (string | null);
    /**
     * The description of the pipeline
     */
    description?: (string | null);
};


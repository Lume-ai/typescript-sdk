/**
 * A pipeline is an object containing a target schema, and associated with a mapper that jobs can be executed on.
 */
export type PipelineSchema__Read = {
    /**
     * The unique identifier of this object
     */
    readonly id: string;
    /**
     * The date and time this object was created
     */
    readonly created_at: string;
    /**
     * The name of the pipeline. Must be unique within the organization.
     */
    name: string;
    /**
     * The description of the pipeline
     */
    description?: (string | null);
    /**
     * The target schema of the pipeline. In json-schema format.
     */
    target_schema: Record<string, any>;
    /**
     * The source schema of the pipeline, infered from the pipeline's jobs. In json-schema format
     */
    readonly source_schema?: (Record<string, any> | null);
    /**
     * The date and time this object was last updated
     */
    readonly updated_at: (string | null);
};


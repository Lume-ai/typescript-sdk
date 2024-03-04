/**
 * A pipeline is an object containing a target schemas, and associated with a mapper that jobs can be executed on.
 */
export type PipelineSchema__Write = {
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
    target_schema?: Record<string, any>;
};


/**
 * A pipeline is an object containing source and target schemas, and associated with a mapper that jobs can be executed on.
 */
export type Update = {
    /**
     * The name of the pipeline. Must be unique within the organization.
     */
    name?: (string | null);
    /**
     * The description of the pipeline
     */
    description?: (string | null);
};


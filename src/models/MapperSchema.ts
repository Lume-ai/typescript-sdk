/**
 * A mapper is a an object defining how to transform data from a source schema to a specific field in a target schema. It is associated with a pipeline and can be used to transform data in a job.
 */
export type MapperSchema = {
    /**
     * The transformation to be applied to the data
     */
    transformation: Record<string, any>;
    /**
     * The field in the target schema that the transformation will be applied to
     */
    targetField: string;
};


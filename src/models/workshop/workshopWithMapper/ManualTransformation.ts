/**
 * A ManualTransformation is a transformation that is manually defined by the user. It is used to transform data from a source schema to a specific field in a target schema.
 * NOTE: either extract or default must be present.
 */
export type ManualTransformation = {
    /**
     * The source property to extract one-to-one mapping to, in dotted path notation to represent hierarchy (e.g. 'user.name')
     */
    extract?: string;
    /**
     * OPTIONAL: The default value to be used if the source property from 'extract' is missing. If 'extract' property is not present, then this value will be used as the default value for the target field.
     */
    default?: any | null;
};

export type ManualTransformation = {
    /**
     * The source property to extract one-to-one mapping to, in dotted path notation to represent hierarchy (e.g. 'user.name')
     */
    extract: string;
    /**
     * The default value to be used if the source property from 'extract' is missing. If 'extract' is missing, then this value will be used as the default value for the target field.
     */
    default: any | null;
};

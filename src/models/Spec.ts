export type Spec = {
    /**
     * The sources of the spec.
     */
    readonly "@sources" : string[];

    /**
     * The default values of the spec.
     */
    readonly "@default_values" : any[];

    /**
     * The lookup of the spec.
     */
    readonly "@lookup" ?: Record<string, any>;

    /**
     * The confidence score of the lookups.
     */
    readonly confidence_score ?: {
        lookup_confidence: Record<string, string>;
    };
}
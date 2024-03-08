/**
 * Represents a run workshop payload with a target schema.
 */
export type WorkshopWithSchemaPayload = {
    /**
     * The target schema definition for the workshop.
     */
    target_schema: Record<string, any>;
    /**
     * Indicates whether auto-deployment is enabled for the workshop (optional).
     */
    auto_deploy?: boolean | null;
};
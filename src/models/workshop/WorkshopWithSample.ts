import { MappingRequestSchema } from "../MappingRequestSchema";

/**
 * Represents a run workshop payload with a sample mapping request.
 */
export type WorkshopWithSample = {
    /**
     * The sample mapping request for the workshop.
     */
    sample: MappingRequestSchema;
    /**
     * Indicates whether auto-deployment is enabled for the workshop (optional).
     */
    auto_deploy?: boolean | null;
};
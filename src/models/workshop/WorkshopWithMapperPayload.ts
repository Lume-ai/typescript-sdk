import { MapperSchema } from "../MapperSchema";

/**
 * Represents a run workshop payload with mapper changes.
 */
export type WorkshopWithMapperPayload = {
    /**
     * An array of mapper configurations for the workshop.
     */
    mapper: Array<MapperSchema>;
    /**
     * Indicates whether auto-deployment is enabled for the workshop (optional).
     */
    auto_deploy?: boolean | null;
};


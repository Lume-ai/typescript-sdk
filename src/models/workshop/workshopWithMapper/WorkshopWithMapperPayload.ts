import { MapperEditSchema } from "./MapperEditSchema";

/**
 * Represents a run workshop payload with mapper changes.
 */
export type WorkshopWithMapperPayload = {
    /**
     * An array of mapper configurations for the workshop.
     */
    mapper: Array<MapperEditSchema>;
    /**
     * Indicates whether auto-deployment is enabled for the workshop (optional).
     */
    auto_deploy?: boolean | null;

    /**
     * Indicates whether to return immediately after starting the job (optional).
     * This allows for asynchronous job execution and polling the job status later.
     */
    immediate_return?: boolean
};
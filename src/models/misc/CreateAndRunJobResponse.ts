import { Result } from "../Result";

/**
 * The response of the createAndRunJob request
 */
export type CreateAndRunJobResponse = {
    /**
     * The name of the pipeline. Must be unique within the organization.
     */
    result: Result;
    /**
     * The description of the pipeline
     */
    jobId: string;
};


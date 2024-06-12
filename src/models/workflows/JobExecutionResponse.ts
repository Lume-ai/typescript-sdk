import { PaginatedResponse } from "../../types/pagination";
import { Job } from "../Job";
import { Mapping } from "../Mapping";
import { Result } from "../Result";

/**
 * An object that displays the result of a job execution.
 * This type is used in the workflow service to return multiple relevant objects in a single response.
 */
export type JobExecutionResponse = {
    /**
     * The result of the job
     */
    result: Result;

    /**
     * The mappings for the result of the job
     */
    mappingsPage: PaginatedResponse<Mapping>;

    /**
     * The id of the job that was executed
     */
    jobId: string;
}
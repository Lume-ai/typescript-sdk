import { TargetFieldsToPrompt } from "./TargetFieldsToPrompt";

/**
 * Represents a run workshop payload with a prompt mapping request.
 */
export type WorkshopWithPromptPayload = {
    /**
     * The prompt mapping request for the workshop.
     */
    target_fields_to_prompt: TargetFieldsToPrompt;
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

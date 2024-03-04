/**
 * Represents a user request object.
 */
export type UserRequest = {
    /**
     * The name of the user.
     */
    name: string;
    /**
     * The email address of the user (optional).
     */
    email?: string | null;
    /**
     * The API key associated with the user (optional).
     */
    api_key?: string;
    /**
     * The Auth0 ID of the user (optional).
     */
    auth0_id?: string | null;
};
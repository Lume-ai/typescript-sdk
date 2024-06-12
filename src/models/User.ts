/**
 * Represents a user object.
 */
export type User = {
    /**
     * The unique identifier of the user.
     */
    id: string;
    /**
     * The name of the user.
     */
    name: string;
    /**
     * The API key associated with the user.
     */
    api_key: string;
    /**
     * The email address of the user (optional).
     */
    email?: string | null;
    /**
     * The Auth0 ID of the user (optional).
     */
    auth0_id?: string | null;
};
// UserService.ts

import { BaseService } from "./BaseService";

/**
 * Service class for interacting with user-related operations.
 * Provides a method for fetching user details.
 */
export class UserService extends BaseService {

     /**
     * Constructs a new instance of UserService.
     * @param apiKey The API key used for authentication.
     * @param baseUrl The base URL for the API (optional).
     */
    constructor(apiKey: string, baseUrl?: string) {
        super(apiKey, baseUrl);
    }

     /**
     * Retrieves details of the authenticated user.
     * @returns A promise that resolves to the user details.
     */
    public async getUserDetails() {
        return await this.get('/users/me');
    }
}

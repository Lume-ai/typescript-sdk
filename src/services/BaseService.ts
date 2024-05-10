// services/BaseService.ts

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { PaginatedResponse } from '../types/pagination';

const PROD_ENDPOINT = 'https://api.lume-terminus.com'
// const PROD_ENDPOINT = 'http://staging.lume-terminus.com'


/**
 * Base service class providing common functionality for other services.
 */
export class BaseService {
    private httpClient: AxiosInstance;

    /**
    * Constructs a new instance of BaseService.
    * @param apiKey The API key used for authentication.
    * @param baseURL The base URL of the API (optional, defaults to 'https://api.lume-terminus.com').
    */
    constructor(apiKey: string, baseURL: string = PROD_ENDPOINT) {
        this.httpClient = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
                "lume-api-key": apiKey
            },
        });

        this.initializeRequestInterceptors();
    }

    /**
     * Initializes request interceptors for handling requests and responses.
     */
    private initializeRequestInterceptors() {
        this.httpClient.interceptors.request.use(this.handleRequest, this.handleError);
        this.httpClient.interceptors.response.use(this.handleResponse, this.handleError);
    }

    /**
    * Handles request before it is sent.
    * @param config Axios request configuration.
    * @returns Modified Axios request configuration.
    */
    private handleRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        config.headers = config.headers || {}; // Ensures headers object exists, should be redundant
        // config.headers['lume-api-key'] = this.apiKey;
        return config;
    };

    /**
     * Handles response received from the server.
     * @param response Axios response object.
     * @returns Axios response object.
     */
    private handleResponse = (response: AxiosResponse): AxiosResponse => {
        return response;
    };

    /**
    * Fetches paginated data from the specified endpoint.
    * @param endpoint The endpoint to fetch data from.
    * @param page The page number (optional, defaults to 1).
    * @param size The number of items per page (optional, defaults to 50).
    * @returns A promise that resolves to a paginated response.
    */
    protected async fetchPaginatedData<T>(endpoint: string, page: number = 1, size: number = 50): Promise<PaginatedResponse<T>> {
        const response = await this.httpClient.get<PaginatedResponse<T>>(endpoint, { params: { page, size } });
        return response.data;
    }

    protected async fetchPaginatedDataWithParams<T>(endpoint: string, params: Record<string, any>): Promise<PaginatedResponse<T>> {
        const response = await this.httpClient.get<PaginatedResponse<T>>(endpoint, { params });
        return response.data;
    }

    protected async postPaginatedDataWithParams<T>(endpoint: string, body: Record<string, any>, page: number = 1, size: number = 50 ): Promise<PaginatedResponse<T>> {
        const config = {
            params: { page, size }
        };
        const response = await this.httpClient.post<PaginatedResponse<T>>(endpoint, body, config);
        return response.data;
    }

    protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.httpClient.get<T>(url, config).then(res => res.data);
    }

    protected async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.httpClient.post<T>(url, data, config).then(res => res.data);
    }

    protected async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.httpClient.put<T>(url, data, config).then(res => res.data);
    }

    protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.httpClient.delete<T>(url, config).then(res => res.data);
    }

    /**
     * Handles errors that occur during HTTP requests.
     * @param error Axios error object.
     * @returns A rejected promise with the error object.
     */
    private handleError = (error: AxiosError) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            console.error("Response status:", error.response.status, "Response data:", error.response.data);
            return Promise.reject(error.response);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("No response received from the server");
            return Promise.reject(new Error("No response received from the server"));
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Request failed with error:", error.message);
            return Promise.reject(error);
        }
    };
}

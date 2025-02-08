// apiClient.ts

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import qs from "qs";
import { HTTPExceptionError } from "../models/Error";
/**
 * Base service class providing common functionality for other services.
 */
export class ApiClient {
  protected httpClient: AxiosInstance;

  constructor(apiKey: string, baseURL: string) {
    this.httpClient = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
        "lume-api-key": apiKey,
      },
      paramsSerializer: (params) => {
        const queryParams: any = { ...params };

        // Keep include as an array to get separate include parameters
        // This will result in include=value1&include=value2 format

        return qs.stringify(queryParams, {
          arrayFormat: "repeat",
          encode: false,
        });
      },
    });

    this.initializeInterceptors();
  }

  private initializeInterceptors() {
    this.httpClient.interceptors.request.use(
      this.handleRequest,
      this.handleError
    );
    this.httpClient.interceptors.response.use(
      this.handleResponse,
      this.handleError
    );
  }

  private handleRequest = (
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig => {
    // Modify the request if needed
    return config;
  };

  private handleResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
  };

  private handleError = (error: any): Promise<never> => {
    // Handle Axios Error codes
    if (error.code) {
      switch (error.code) {
        case "ERR_NETWORK":
          return Promise.reject({
            code: -1,
            message: "Network error - please check your internet connection",
          });
        case "ERR_BAD_REQUEST":
          return Promise.reject({
            code: 400,
            message: error.response?.data?.detail || "Invalid request",
          });
        case "ERR_BAD_RESPONSE":
          return Promise.reject({
            code: 500,
            message: "Server returned an invalid response",
          });
        case "ERR_INVALID_URL":
          return Promise.reject({
            code: -2,
            message: `Invalid API URL configuration: ${
              error.config?.baseURL || "no URL provided"
            }`,
          });
        case "ECONNREFUSED":
          return Promise.reject({
            code: -3,
            message:
              "Connection refused - server may be down or URL is incorrect",
          });
      }
    }

    if (error.response) {
      // Extract status and message for known errors
      const code = error.response.status;
      const message =
        error.response.data?.detail ||
        error.response.data?.message ||
        error.message ||
        "An unknown error occurred";
      const error_id = error.response.data?.error_id || null;

      return Promise.reject({ code, message, error_id });
    }

    if (error.request) {
      // Request was made but no response received
      return Promise.reject({
        code: -4,
        message: `No response received from server: ${error.message}`,
      });
    }

    // Fallback for any other errors
    return Promise.reject({
      code: -5,
      message: `Request failed: ${error.message || "Unknown error occurred"}`,
      detail: error,
    });
  };

  // Public methods to be used in other classes
  public async get<T>(
    url: string,
    config?: AxiosRequestConfig,
    baseURLOverride?: string
  ): Promise<T> {
    const finalConfig = { ...config };
    if (baseURLOverride) {
      finalConfig.baseURL = baseURLOverride;
    }
    return this.httpClient.get<T>(url, finalConfig).then((res) => res.data);
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
    baseURLOverride?: string
  ): Promise<T> {
    const finalConfig = { ...config };
    if (baseURLOverride) {
      finalConfig.baseURL = baseURLOverride;
    }
    return this.httpClient
      .post<T>(url, data, finalConfig)
      .then((res) => res.data);
  }

  public async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
    baseURLOverride?: string
  ): Promise<T> {
    const finalConfig = { ...config };
    if (baseURLOverride) {
      finalConfig.baseURL = baseURLOverride;
    }
    return this.httpClient
      .patch<T>(url, data, finalConfig)
      .then((res) => res.data);
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
    baseURLOverride?: string
  ): Promise<T> {
    const finalConfig = { ...config };
    if (baseURLOverride) {
      finalConfig.baseURL = baseURLOverride;
    }
    return this.httpClient.delete<T>(url, finalConfig).then((res) => res.data);
  }
}

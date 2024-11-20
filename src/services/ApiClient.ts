// apiClient.ts

import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
  } from 'axios';
  import qs from 'qs';
  import { HTTPExceptionError } from '../models/Error';
  /**
   * Base service class providing common functionality for other services.
   */
  export class ApiClient {
    protected httpClient: AxiosInstance;
  
    constructor(apiKey: string, baseURL: string) {
      this.httpClient = axios.create({
        baseURL,
        headers: {
          'Content-Type': 'application/json',
          'lume-api-key': apiKey,
        },
        paramsSerializer: (params) => {
            const queryParams: any = { ...params };
            
            // Keep include as an array to get separate include parameters
            // This will result in include=value1&include=value2 format
            
            return qs.stringify(queryParams, { 
                arrayFormat: 'repeat',
                encode: false
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
      if (error.response) {
        // Extract status and message for known errors
        const code = error.response.status;
        const message = error.response.data.detail || "An unknown error occurred";
        const error_id = error.response.data.error_id || null;
      // Throw as HTTPExceptionError
      const exceptionError: HTTPExceptionError = { code, message, error_id};
      return Promise.reject(exceptionError);
      } else if (error.request) {
        // Handle no response from the server
        const exceptionError: HTTPExceptionError = {
          code: 0,
          message: "No response received from the server",
        };
        return Promise.reject(exceptionError);
      } else {
        // Handle any other errors
        const exceptionError: HTTPExceptionError = {
          code: 0,
          message: "Request failed with an unknown error",
        };
        return Promise.reject(exceptionError);
      }
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
      return this.httpClient.post<T>(url, data, finalConfig).then((res) => res.data);
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
      return this.httpClient.patch<T>(url, data, finalConfig).then((res) => res.data);
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
  
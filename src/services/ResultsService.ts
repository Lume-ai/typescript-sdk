import { PaginatedResponse } from '../types/pagination';
import { BaseService } from './BaseService';
import { MappingRequestSchema } from '../models/workshop/MappingRequestSchema';
import { ResultSchema, MappingSchema } from '../models';

/**
 * Service class for interacting with result-related operations.
 * Provides methods for fetching result details, fetching job results, and fetching mappings for a result.
 */
export class ResultsService extends BaseService {

    /**
     * Constructs a new instance of ResultsService.
     * @param apiKey The API key used for authentication.
     */
    constructor(apiKey: string) {
        super(apiKey);
    }

    /**
     * Retrieves details of a specific result.
     * @param resultId The ID of the result to fetch details for.
     * @returns A promise that resolves to the result details.
     */
    public async getResult(resultId: string): Promise<ResultSchema> {
        return this.get<ResultSchema>(`/results/${resultId}`);
    }

    /**
     * Retrieves job results associated with a specific job.
     * @param jobId The ID of the job.
     * @param page The page number to fetch (optional, defaults to 1).
     * @param size The number of items per page (optional, defaults to 50).
     * @returns A promise that resolves to a paginated response of job results.
     */
    public async getJobResults(jobId: string, page: number = 1, size: number = 50): Promise<PaginatedResponse<ResultSchema>> {
        return this.fetchPaginatedData<ResultSchema>(`/jobs/${jobId}/results`, page, size);
    }

     /**
     * Retrieves mappings associated with a specific result.
     * @param resultId The ID of the result.
     * @param page The page number to fetch (optional, defaults to 1).
     * @param size The number of items per page (optional, defaults to 50).
     * @returns A promise that resolves to a paginated response of mappings.
     */
    public async getMappingsForResult(resultId: string, page: number = 1, size: number = 50): Promise<PaginatedResponse<MappingSchema>> {
        return this.fetchPaginatedData<MappingSchema>(`/results/${resultId}/mappings`, page, size);
    }
}

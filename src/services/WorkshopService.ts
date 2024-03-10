import { Result, SuccessSchema, WorkshopWithMapperPayload, WorkshopWithSamplePayload, WorkshopWithSchemaPayload } from '../models';
import { Workshop } from '../models/workshop/Workshop';
import { PaginatedResponse } from '../types/pagination';
import { BaseService } from './BaseService';

/**
 * Service class for interacting with workshop-related operations.
 * Provides methods for managing workshops, including creation, deletion, and execution.
 */
export class WorkshopService extends BaseService {

    /**
     * Constructs a new instance of WorkshopService.
     * @param apiKey The API key used for authentication.
     */
    constructor(apiKey: string) {
        super(apiKey);
    }

    /**
     * Retrieves details of a specific workshop.
     * @param workshopId The ID of the workshop to fetch details for.
     * @returns A promise that resolves to the workshop details.
     */
    public async getWorkshop(workshopId: string): Promise<Workshop> {
        return this.get<Workshop>(`/workshops/${workshopId}`);
    }

    /**
     * Creates a new workshop for the specified job.
     * @param jobId The ID of the job to create the workshop for.
     * @returns A promise that resolves to the created workshop.
     */
    public async createWorkshopForJob(jobId: string): Promise<Workshop> { // Replace any with a more specific type if available
        return this.post<Workshop>(`/jobs/${jobId}/workshops`);
    }

    /**
     * Deletes a workshop with the specified ID.
     * @param workshopId The ID of the workshop to delete.
     * @returns A promise that resolves when the workshop is successfully deleted.
     */
    public async deleteWorkshop(workshopId: string): Promise<SuccessSchema> {
        return this.delete<SuccessSchema>(`/workshops/${workshopId}`);
    }

    /**
     * Runs the mapper of a workshop with the specified ID.
     * @param workshopId The ID of the workshop to run the mapper for.
     * @param workshopWithMapperPayload Details required for running the mapper (WorkshopWithMapperPayload object).
     * @returns A promise that resolves to the result of running the mapper.
     */
    public async runWorkshopMapper(workshopId: string, workshopWithMapperPayload: WorkshopWithMapperPayload): Promise<Result> {
        return this.post<Result>(`/workshops/${workshopId}/mapper/run`, workshopWithMapperPayload);
    }

    /**
     * Runs a sample for the workshop with the specified ID.
     * @param workshopId The ID of the workshop to run the sample for.
     * @param workshopWithSamplePayload Details required for running the sample (WorkshopWithSamplePayload).
     * @returns A promise that resolves to the result of running the sample.
     */
    public async runWorkshopSample(workshopId: string, workshopWithSamplePayload: WorkshopWithSamplePayload): Promise<Result> {
        return this.post<Result>(`/workshops/${workshopId}/sample/run`, workshopWithSamplePayload);
    }

    /**
     * Runs the target schema for the workshop with the specified ID.
     * @param workshopId The ID of the workshop to run the target schema for.
     * @param workshopWithSchemaPayload Details required for running the target schema (WorkshopWithSchemaPayload).
     * @returns A promise that resolves to the result of running the target schema.
     */
    public async runWorkshopTargetSchema(workshopId: string, workshopWithSchemaPayload: WorkshopWithSchemaPayload): Promise<Result> { 
        return this.post<Result>(`/workshops/${workshopId}/target_schema/run`, workshopWithSchemaPayload);
    }

    /**
     * Deploys the workshop with the specified ID.
     * @param workshopId The ID of the workshop to deploy.
     * @returns A promise that resolves to the deployed workshop details.
     */
    public async deployWorkshop(workshopId: string): Promise<Workshop> {
        return this.post<Workshop>(`/workshops/${workshopId}/deploy`);
    }

    /**
     * Retrieves results associated with a specific workshop.
     * @param workshopId The ID of the workshop.
     * @param page The page number to fetch (optional, defaults to 1).
     * @param size The number of items per page (optional, defaults to 50).
     * @returns A promise that resolves to a paginated response of results.
     */
    public async getResultsForWorkshop(workshopId: string, page: number = 1, size: number = 50): Promise<PaginatedResponse<Result>> {
        return this.fetchPaginatedData<Result>(`/workshops/${workshopId}/results`, page, size);
    }
}

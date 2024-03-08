import { ResultSchema, SuccessSchema, WorkshopWithMapperPayload, WorkshopWithSamplePayload, WorkshopWithSchemaPayload } from '../models';
import { WorkshopSchema } from '../models/workshop/WorkshopSchema';
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
    public async getWorkshop(workshopId: string): Promise<WorkshopSchema> {
        return this.get<WorkshopSchema>(`/workshops/${workshopId}`);
    }

    /**
     * Creates a new workshop for the specified job.
     * @param jobId The ID of the job to create the workshop for.
     * @returns A promise that resolves to the created workshop.
     */
    public async createWorkshopForJob(jobId: string): Promise<WorkshopSchema> { // Replace any with a more specific type if available
        return this.post<WorkshopSchema>(`/jobs/${jobId}/workshops`);
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
    public async runWorkshopMapper(workshopId: string, workshopWithMapperPayload: WorkshopWithMapperPayload): Promise<ResultSchema> {
        return this.post<ResultSchema>(`/workshops/${workshopId}/mapper/run`, workshopWithMapperPayload);
    }

    /**
     * Runs a sample for the workshop with the specified ID.
     * @param workshopId The ID of the workshop to run the sample for.
     * @param workshopWithSamplePayload Details required for running the sample (WorkshopWithSamplePayload).
     * @returns A promise that resolves to the result of running the sample.
     */
    public async runWorkshopSample(workshopId: string, workshopWithSamplePayload: WorkshopWithSamplePayload): Promise<ResultSchema> {
        return this.post<ResultSchema>(`/workshops/${workshopId}/sample/run`, workshopWithSamplePayload);
    }

    /**
     * Runs the target schema for the workshop with the specified ID.
     * @param workshopId The ID of the workshop to run the target schema for.
     * @param workshopWithSchemaPayload Details required for running the target schema (WorkshopWithSchemaPayload).
     * @returns A promise that resolves to the result of running the target schema.
     */
    public async runWorkshopTargetSchema(workshopId: string, workshopWithSchemaPayload: WorkshopWithSchemaPayload): Promise<ResultSchema> { 
        return this.post<ResultSchema>(`/workshops/${workshopId}/target_schema/run`, workshopWithSchemaPayload);
    }

    /**
     * Deploys the workshop with the specified ID.
     * @param workshopId The ID of the workshop to deploy.
     * @returns A promise that resolves to the deployed workshop details.
     */
    public async deployWorkshop(workshopId: string): Promise<WorkshopSchema> {
        return this.post<WorkshopSchema>(`/workshops/${workshopId}/deploy`);
    }

    /**
     * Retrieves results associated with a specific workshop.
     * @param workshopId The ID of the workshop.
     * @param page The page number to fetch (optional, defaults to 1).
     * @param size The number of items per page (optional, defaults to 50).
     * @returns A promise that resolves to a paginated response of results.
     */
    public async getResultsForWorkshop(workshopId: string, page: number = 1, size: number = 50): Promise<PaginatedResponse<ResultSchema>> {
        return this.fetchPaginatedData<ResultSchema>(`/workshops/${workshopId}/results`, page, size);
    }


    /**
     * Section 2: Workflow abstractions 
     * 
     * The following methods are abstractions for common workflows that involve multiple API calls.
     * These methods are provided for convenience and to simplify common use cases.
     *  
     * These methods are not part of the Lume API, but are provided as a convenience to users of the Lume SDK.
     * 
     **/

    /**
     * Creates a workshop for job and runs the workshop with mapper edits.
     * @param jobId The ID of the job to create the workshop for.
     * @param workshopWithMapperPayload Details required for running the mapper (WorkshopWithMapperPayload object).
     * @returns A promise that resolves to the result of running the mapper.
     */
    public async editWithMapper(jobId: string, workshopWithMapperPayload: WorkshopWithMapperPayload): Promise<ResultSchema> {
        const workshop = await this.createWorkshopForJob(jobId);

        let result: ResultSchema = await this.runWorkshopMapper(
            workshop.id,
            workshopWithMapperPayload
        );

        return result;
    }

    /**
     * Creates a workshop for job and runs the workshop with sample edits.
     * @param jobId The ID of the job to create the workshop for.
     * @param workshopWithSamplePayload The sample to apply to the workshop (WorkshopWithSamplePayload).
     * @returns A promise that resolves to the result of running the sample.
     */
    public async editWithSample(jobId: string, workshopWithSamplePayload: WorkshopWithSamplePayload): Promise<ResultSchema> {
        const workshop = await this.createWorkshopForJob(jobId);

        let result: ResultSchema = await this.runWorkshopSample(
            workshop.id,
            workshopWithSamplePayload
        );

        return result;
    }

    /**
     * Creates a workshop for job and runs the workshop with schema edits.
     * @param jobId The ID of the job to create the workshop for.
     * @param workshopWithSchemaPayload The schema to apply to the workshop (WorkshopWithSchemaPayload).
     * @returns A promise that resolves to the result of running the schema.
     */
    public async editWithSchema(jobId: string, workshopWithSchemaPayload: WorkshopWithSchemaPayload): Promise<ResultSchema> {
        const workshop = await this.createWorkshopForJob(jobId);

        let result: ResultSchema = await this.runWorkshopTargetSchema(
            workshop.id,
            workshopWithSchemaPayload
        );

        return result;
    }

}

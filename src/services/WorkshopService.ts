import { ResultSchema, SuccessSchema, WorkshopWithMapper, WorkshopWithSample, WorkshopWithSchema } from '../models';
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
     * @param mapperDetails Details required for running the mapper (WorkshopWithMapper object).
     * @returns A promise that resolves to the result of running the mapper.
     */
    public async runWorkshopMapper(workshopId: string, mapperDetails: WorkshopWithMapper): Promise<ResultSchema> { // Replace any with a specific type for mapper details
        return this.post<ResultSchema>(`/workshops/${workshopId}/mapper/run`, mapperDetails);
    }

    /**
     * Runs a sample for the workshop with the specified ID.
     * @param workshopId The ID of the workshop to run the sample for.
     * @param sampleDetails Details required for running the sample (WorkshopWithSample).
     * @returns A promise that resolves to the result of running the sample.
     */
    public async runWorkshopSample(workshopId: string, sampleDetails: WorkshopWithSample): Promise<ResultSchema> { // Replace any with a specific type for sample details
        return this.post<ResultSchema>(`/workshops/${workshopId}/sample/run`, sampleDetails);
    }

    /**
     * Runs the target schema for the workshop with the specified ID.
     * @param workshopId The ID of the workshop to run the target schema for.
     * @param schemaDetails Details required for running the target schema (WorkshopWithSchema).
     * @returns A promise that resolves to the result of running the target schema.
     */
    public async runWorkshopTargetSchema(workshopId: string, schemaDetails: WorkshopWithSchema): Promise<ResultSchema> { // Replace any with a specific type for schema details
        return this.post<ResultSchema>(`/workshops/${workshopId}/target_schema/run`, schemaDetails);
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
     * @param mapperDetails The mapper to apply to the workshop (optional, defaults to null).
     * @returns A promise that resolves to a paginated response of results.
     */
    public async editWithMapper(jobId: string, mapperDetails: WorkshopWithMapper) {
        const autoDeploy = mapperDetails.auto_deploy || false;

        const workshop = await this.createWorkshopForJob(jobId);
      
        let result: ResultSchema = await this.runWorkshopMapper(
          workshop.id,
          mapperDetails
        );
              
        return result;
      }

    

}

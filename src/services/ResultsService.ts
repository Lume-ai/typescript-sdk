import { PaginatedResponse } from "../types/pagination";
import { BaseService } from "./BaseService";
import { Result, Mapping } from "../models";
import { Spec } from "../models/Spec";
import { ManifestItem } from "../models/ManifestItem";

/**
 * Service class for interacting with result-related operations.
 * Provides methods for fetching result details, fetching job results, and fetching mappings for a result.
 */
export class ResultsService extends BaseService {
  /**
   * Constructs a new instance of ResultsService.
   * @param apiKey The API key used for authentication.
   * @param baseUrl The base URL for the API (optional).
   */
  constructor(apiKey: string, baseUrl?: string) {
    super(apiKey, baseUrl);
  }

  /**
   * Retrieves details of a specific result.
   * @param resultId The ID of the result to fetch details for.
   * @returns A promise that resolves to the result details.
   */
  public async getResult(resultId: string): Promise<Result> {
    return this.get<Result>(`/results/${resultId}`);
  }

  /**
   * Retrieves job results associated with a specific job.
   * @param jobId The ID of the job.
   * @param page The page number to fetch (optional, defaults to 1).
   * @param size The number of items per page (optional, defaults to 50).
   * @returns A promise that resolves to a paginated response of job results.
   */
  public async getJobResults(
    jobId: string,
    page: number = 1,
    size: number = 50
  ): Promise<PaginatedResponse<Result>> {
    return this.fetchPaginatedData<Result>(
      `/jobs/${jobId}/results`,
      page,
      size
    );
  }

  /**
   *
   * @param resultId
   * @returns
   */
  public getSpecForResult(resultId: string): Promise<Record<string, Spec>> {
    return this.get<Record<string, Spec>>(`/results/${resultId}/spec`);
  }

  /**
   * Retrieves mappings associated with a specific result.
   * @param resultId The ID of the result.
   * @param page The page number to fetch (optional, defaults to 1).
   * @param size The number of items per page (optional, defaults to 50).
   * @param include_spec Whether to include the spec of the mapping task (optional, defaults to true).
   * @returns A promise that resolves to a paginated response of mappings.
   */
  public async getMappingsForResult(
    resultId: string,
    page: number = 1,
    size: number = 50,
    include_spec: boolean = true
  ): Promise<PaginatedResponse<Mapping>> {
    return this.fetchPaginatedDataWithParams<Mapping>(
      `/results/${resultId}/mappings`,
      { page, size, include_spec }
    );
  }

  /**
   * Generates confidence scores for a specific result.
   * @param resultId
   * @returns
   */
  public async generateConfidenceScores(resultId: string): Promise<Result> {
    return this.post<Result>(`/results/${resultId}/confidence`);
  }

  /**
   * Retrieves the manifest for a specific result.
   * @param resultId The ID of the result to fetch the manifest for.
   * @param include Optional metadata to include in the manifest (e.g., ['schema', 'lookup']).
   * @param page The page number to fetch (optional, defaults to 1).
   * @param size The number of items per page (optional, defaults to 50).
   * @returns A promise that resolves to a paginated response of manifest items.
   */
  public async getManifestForResult(
    resultId: string,
    include: string[] = [],
    page: number = 1,
    size: number = 50
  ): Promise<PaginatedResponse<ManifestItem>> {
    return this.fetchPaginatedDataWithParams<ManifestItem>(
      `/results/${resultId}/manifest`,
      { include, page, size }
    );
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

  // TODO: Add workflow abstractions here
}

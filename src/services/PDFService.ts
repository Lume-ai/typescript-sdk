//services/PDFService.ts
import { FileResult } from "../models/FileResult";
import { BaseService } from "./BaseService";
import { PaginatedResponse } from "../types/pagination";

/**
 * Service class for PDF-related workflows.
 * This may include custom endpoints for specific use cases.
 */
export class PDFService extends BaseService {
  /**
   * Constructs a new instance of PDFService.
   * @param apiKey The API key used for authentication.
   * @param baseUrl The base URL for the API (optional).
   */
  constructor(apiKey: string, baseUrl?: string) {
    super(apiKey, baseUrl);
  }

  public async processAdvForm(): Promise<FileResult> {
    return this.get<FileResult>(`/pdf/adv`);
  }

  public async getAdvForm(id: string): Promise<FileResult> {
    return this.get<FileResult>(`/pdf/adv/${id}`);
  }

  public async getAdvForms(): Promise<PaginatedResponse<FileResult>> {
    return this.fetchPaginatedData<FileResult>(`/pdf/adv`);
  }
}

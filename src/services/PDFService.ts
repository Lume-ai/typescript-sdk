//services/PDFService.ts
import { FileResult } from "../models/FileResult";
import { PaginatedResponse } from "../types/pagination";
import { BaseService } from "./BaseService";

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

  public async processAdvForm(file: File): Promise<FileResult> {
    const formData = new FormData();
    formData.append("file", file);

    return this.post<FileResult>(`/pdf/adv`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  public async getAdvForm(id: string): Promise<FileResult> {
    return this.get<FileResult>(`/pdf/adv/${id}`);
  }

  public async getAdvFormsPage(
    page: number = 1,
    size: number = 50
  ): Promise<PaginatedResponse<FileResult>> {
    return this.fetchPaginatedData<FileResult>(`/pdf/adv`, page, size);
  }

  public async getAdvFormUrl(id: string): Promise<string> {
    const result = await this.get<{url: string}>(`/pdf/adv/${id}/url`);
    return result.url;
  }

  public async processOrderForm(file: File): Promise<FileResult> {
    const formData = new FormData();
    formData.append("file", file);

    return this.post<FileResult>(`/pdf/orders`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  public async getOrderForm(id: string): Promise<FileResult> {
    return this.get<FileResult>(`/pdf/orders/${id}`);
  }

  public async getOrderFormsPage(
    page: number = 1,
    size: number = 50
  ): Promise<PaginatedResponse<FileResult>> {
    return this.fetchPaginatedData<FileResult>(`/pdf/orders`, page, size);
  }

  public async getOrderFormUrl(id: string): Promise<string> {
    const result = await this.get<{ url: string }>(`/pdf/orders/${id}/url`);
    return result.url;
  }
}

//services/HelperService.ts

import { getFileReader } from "../utils/helperService/fileReader/getFileReader";
import { BaseService } from "./BaseService";

/**
 * Service class for convenience methods.
 */
export class HelperService extends BaseService {

    /**
     * Constructs a new instance of PipelineService.
     * @param apiKey The API key used for authentication.
     * @param baseUrl The base URL for the API (optional).
     */
    constructor(apiKey: string, baseUrl?: string) {
        super(apiKey, baseUrl);
    }

    /**
     * Converts an Excel file to JSON using the specified pipeline and job details.
     * NOTE: this method uses web environment packages to convert the file. Thus, it is not available in Node.js environment.
     * 
     * @param file The Excel file to convert, File if called from the browser, string if called from Node.js.
     * @param name The name of the file.
     * @param sheets The names of the sheets to convert (optional).
     * @returns A promise that resolves to the JSON data.
     * @throws Error if the file cannot be converted.
     * @example
     * ```typescript
     * const file = document.getElementById('file-input').files[0];
     * const name = file.name;
     * const sheets = ['Sheet1', 'Sheet2'];
     * const json = await helperService.convertExcelToJson(file, name, sheets);
     * console.log(json);
     * ```
     */

    public async convertExcelToJson(file: File | string, name: string, sheets?: string[]): Promise<any> {
        const reader = getFileReader();
        try {
            const binaryString = await reader.readAsBinaryString(file);
            const payload = {
                file: binaryString,
                name,
                sheets
            }
            return this.post<any>(`/convert/sheets`, payload);
        } catch (error) {
            console.error('Error handling the file:', error);
        }
    }
}

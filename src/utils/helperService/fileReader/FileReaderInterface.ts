export interface FileReaderInterface {
    readAsBinaryString(file: File | string): Promise<string>;
}
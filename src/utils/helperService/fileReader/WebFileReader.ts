import { FileReaderInterface } from "./FileReaderInterface";

export class WebFileReader implements FileReaderInterface {
    async readAsBinaryString(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const buffer: ArrayBuffer = reader.result as ArrayBuffer;
                const binaryString = this.arrayBufferToBinaryString(buffer);
                resolve(binaryString);
            };
            reader.onerror = () => {
                reader.abort();
                reject(new DOMException("Problem parsing input file."));
            };
            reader.readAsArrayBuffer(file);
        });
    }

    private arrayBufferToBinaryString(buffer: ArrayBuffer): string {
        const bytes = new Uint8Array(buffer);
        let binary = '';
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return binary;
    }
}

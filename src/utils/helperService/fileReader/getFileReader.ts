import { FileReaderInterface } from "./FileReaderInterface";
import { WebFileReader } from "./WebFileReader";

export function getFileReader(): FileReaderInterface {
    if (typeof window !== 'undefined' && typeof FileReader !== 'undefined') {
        return new WebFileReader();
    } else {
        throw new Error('Unsupported environment');
    }
}
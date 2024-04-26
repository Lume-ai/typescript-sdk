import { FileReaderInterface } from "./FileReaderInterface";
import { WebFileReader } from "./WebFileReader";

export function getFileReader(): FileReaderInterface {
    if (typeof window !== 'undefined' && typeof FileReader !== 'undefined') {
        console.log('Web environment');
        return new WebFileReader();
    } else if (typeof process !== 'undefined') {
        console.log('Node.js environment');
        throw new Error('Unsupported environment - Node.js environment not supported.');
    } else {
        throw new Error('Unsupported environment');
    }
    
}
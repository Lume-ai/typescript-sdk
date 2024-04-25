import { FileReaderInterface } from "./FileReaderInterface";
import { NodeFileReader } from "./NodeFileReader";
import { WebFileReader } from "./WebFileReader";

export function getFileReader(): FileReaderInterface {
    if (typeof window !== 'undefined' && typeof FileReader !== 'undefined') {
        return new WebFileReader();
    } else if (typeof process !== 'undefined') {
        return new NodeFileReader();
    } else {
        throw new Error('Unsupported environment');
    }
}
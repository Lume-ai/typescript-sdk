import { promises as fs } from 'fs';
import { FileReaderInterface } from './FileReaderInterface';

export class NodeFileReader implements FileReaderInterface {
    async readAsBinaryString(filePath: string): Promise<string> {
        const buffer = await fs.readFile(filePath);
        return buffer.toString('binary');
    }
}

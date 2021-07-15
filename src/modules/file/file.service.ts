import { Injectable } from '@nestjs/common';
import { createReadStream, ReadStream } from 'fs';

@Injectable()
export class FileService {

    async getFileStream(relativePath:string, start: number, end: number): Promise<ReadStream>{
        const videoStream = createReadStream(relativePath, { start, end });
        return videoStream;
    }

}

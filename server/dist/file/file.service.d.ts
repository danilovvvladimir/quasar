/// <reference types="multer" />
export interface FileResponse {
    url: string;
    name: string;
}
export declare class FileService {
    saveFiles(files: Express.Multer.File[], folder?: string): Promise<FileResponse[]>;
}

import { FileService } from "./file.service";
export declare class FileController {
    private readonly fileService;
    constructor(fileService: FileService);
    uploadFile(file: any): Promise<{
        filename: string;
        originalname: any;
    }>;
}

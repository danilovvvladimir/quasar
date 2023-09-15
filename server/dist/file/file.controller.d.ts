/// <reference types="multer" />
import { FileService } from "./file.service";
export declare class FileController {
    private readonly fileService;
    constructor(fileService: FileService);
    create(file: Express.Multer.File, folder?: string): Promise<import("./file.service").FileResponse[]>;
}

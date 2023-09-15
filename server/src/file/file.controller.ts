import {
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileService } from "./file.service";
import { Auth } from "src/decorators/auth";

@Controller("files")
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @HttpCode(200)
  @UseInterceptors(FileInterceptor("image"))
  @Auth()
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Query("folder") folder?: string,
  ) {
    return this.fileService.saveFiles([file], folder);
  }

  // @Delete(":name")
  // @HttpCode(200)
  // @UseInterceptors(FileInterceptor("image"))
  // @Auth()
  // async delete(@Param("name") name: string) {
  //   return this.fileService.delete(name);
  // }
}

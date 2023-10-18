import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileService } from "./file.service";
import { diskStorage } from "multer";
import { extname } from "path";
import { Roles } from "src/decorators/role";
import { AccessTokenGuard } from "src/guard/accessToken";
import { RolesGuard } from "src/guard/roles";
import { DISTINATION_FOLDER_FILE } from "src/constants/file";

@Controller("files")
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: `./${DISTINATION_FOLDER_FILE}`,
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join("");
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file) {
    console.log("Что пришло на сервер:", file);

    return {
      filename: `${DISTINATION_FOLDER_FILE}/${file.filename}`,
      originalname: file.originalname,
    };
  }
}

import {
  Controller,
  Inject,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthJwtGuard } from 'src/modules/auth/guards/authJwt.guard';
import { UploadImageDto } from 'src/modules/files/dtos/uploadImage.dto';
import { IFileUpload } from 'src/modules/files/interfaces/IFileUpload';
import { Routes, Services } from 'src/utils/constants';
import { IFilesService } from 'src/modules/files/interfaces/IFilesService';

@ApiTags('files')
@Controller(Routes.FILES)
export class FilesController {
  constructor(@Inject(Services.FILES) private filesService: IFilesService) {}

  @ApiOperation({ summary: 'Add avatar to user`s profile' })
  @ApiBody({ type: UploadImageDto })
  @ApiResponse({ status: 201, description: 'Image uploaded' })
  @Post(Routes.UPLOAD_IMAGE)
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(ValidationPipe)
  @UseGuards(AuthJwtGuard)
  createImage(@UploadedFile() file: UploadImageDto): Promise<IFileUpload> {
    return this.filesService.createFile(file);
  }
}

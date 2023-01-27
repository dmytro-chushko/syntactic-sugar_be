import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import * as path from 'path';
import { fileName } from 'src/utils/fileName';
import { fileMimetypeFilter } from 'src/utils/customValidator/mimeType';

export function ApiFile(fieldName = 'file', localOptions?: MulterOptions) {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor(fieldName, {
        storage: diskStorage({
          destination: path.resolve(__dirname, '..', 'static'),
          filename: fileName,
        }),
        fileFilter: fileMimetypeFilter('doc', 'docx', 'pdf'),
        ...localOptions,
      }),
    ),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
  );
}

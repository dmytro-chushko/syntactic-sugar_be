import { ApiProperty } from '@nestjs/swagger';

export class UploadImageDto {
  @ApiProperty({ example: 'Image.png' })
  file: Express.Multer.File;
}

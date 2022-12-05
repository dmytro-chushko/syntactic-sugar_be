import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class EditPublishedDto {
  @ApiProperty({ example: true })
  @IsNotEmpty()
  @IsBoolean()
  isPublished: boolean;
}

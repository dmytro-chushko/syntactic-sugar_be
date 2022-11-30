import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class EditPublishedDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isPublished: boolean;
}

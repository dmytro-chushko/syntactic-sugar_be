import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCountryDto {
  @ApiProperty({ example: 'Ukraine' })
  @IsString()
  @IsNotEmpty()
  name: string;
}

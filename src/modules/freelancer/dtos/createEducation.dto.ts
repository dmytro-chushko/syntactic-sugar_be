import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateEducationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of the Institute',
    example: 'University of Developers',
  })
  institute: string;

  @ApiProperty({
    description: 'Occupation in the Institute',
    example: 'FullStack Developer',
  })
  @IsString()
  @IsNotEmpty()
  occupation: string;

  @ApiProperty({
    description: 'Period studying in the Institute',
    example: '3 years',
  })
  @IsString()
  @IsNotEmpty()
  period: string;
}

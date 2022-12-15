import { IsFQDN, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployerDto {
  @ApiProperty({ example: 'Shadow Fiend' })
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({ example: 'HR' })
  @IsString()
  @IsNotEmpty()
  position: string;

  @ApiProperty({ example: '0445690789' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'linkedin.com' })
  @IsString()
  @IsNotEmpty()
  linkedIn: string;

  @ApiProperty({ example: 'www.mysite.com' })
  @IsString()
  @IsNotEmpty()
  @IsFQDN()
  website: string;

  @ApiProperty({ example: 'We provide best business solutions' })
  @IsString()
  @IsNotEmpty()
  aboutUs: string;
}

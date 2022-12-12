import { IsFQDN, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployerDto {
  @ApiProperty()
  @IsNotEmpty()
  fullName: string;

  //add size check for password , don`t do it now cause its should be easier for testing
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  position?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  linkedIn?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsFQDN()
  website?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  aboutUs?: string;
}

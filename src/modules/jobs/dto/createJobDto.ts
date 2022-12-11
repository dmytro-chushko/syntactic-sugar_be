import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';

import {
  AvailableAmountOfHours,
  EmploymentType,
  HourRate,
  EnglishLevel,
  WorkExperience,
} from 'src/database/enums';

export class CreateJobDto {
  @ApiProperty({ example: 'Java script developer for a big  educational project' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Any text wich discribes current job' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'Fullstack developer' })
  @IsNotEmpty()
  @IsString()
  position: string;

  @ApiProperty({ example: 'Remote' })
  @IsNotEmpty()
  @IsEnum(EmploymentType)
  employmentType: EmploymentType;

  @ApiProperty({ example: 'Less than 500$' })
  @IsNotEmpty()
  @IsEnum(HourRate)
  hourRate: HourRate;

  @ApiProperty({ example: 'Part time' })
  @IsNotEmpty()
  @IsEnum(AvailableAmountOfHours)
  availableAmountOfHours: AvailableAmountOfHours;

  @ApiProperty({ example: 'less than 1 year' })
  @IsNotEmpty()
  @IsEnum(WorkExperience)
  workExperience: WorkExperience;

  @ApiProperty({ example: 'Intermediate' })
  @IsNotEmpty()
  @IsEnum(EnglishLevel)
  englishLevel: EnglishLevel;

  @ApiProperty({ example: 'All the other requirenments of the job' })
  @IsNotEmpty()
  @IsString()
  otherRequirenments: string;

  @ApiProperty({ example: 'IT, computers & Internet' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: ['PHP', 'Java'] })
  @IsNotEmpty()
  @IsArray()
  skills: [];

  @ApiProperty({ example: ['Ukraine', 'Germany'] })
  @IsNotEmpty()
  @IsArray()
  countries: [];
}

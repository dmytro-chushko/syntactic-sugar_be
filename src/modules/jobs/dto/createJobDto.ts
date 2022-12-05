import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import {
  AvailableAmountOfHours,
  EmploymentType,
  HourRate,
  LevelEnglish,
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

  @ApiProperty({ example: 'remote' })
  @IsNotEmpty()
  @IsEnum(EmploymentType)
  employmentType: EmploymentType;

  @ApiProperty({ example: 'less than 500$' })
  @IsNotEmpty()
  @IsEnum(HourRate)
  hourRate: HourRate;

  @ApiProperty({ example: 'part time' })
  @IsNotEmpty()
  @IsEnum(AvailableAmountOfHours)
  availableAmountOfHours: AvailableAmountOfHours;

  @ApiProperty({ example: 'less than 1 year' })
  @IsNotEmpty()
  @IsEnum(WorkExperience)
  workExperience: WorkExperience;

  @ApiProperty({ example: 'intermediate' })
  @IsNotEmpty()
  @IsEnum(LevelEnglish)
  levelEnglish: LevelEnglish;

  @ApiProperty({ example: 'All the other requirenments of the job' })
  @IsNotEmpty()
  @IsString()
  otherRequirenments: string;
}

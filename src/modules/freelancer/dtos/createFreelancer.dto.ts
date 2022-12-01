import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Validate,
  IsOptional,
} from 'class-validator';
import { WorkExperience } from 'src/database/enums/WorkExperience';
import { Category } from 'src/database/entities/category.entity';
import { EnglishLevel } from 'src/database/enums/EnglishLevel';
import { AvailableAmountOfHours } from 'src/database/enums/AvailableAmountOfHours';
import { EmploymentType } from 'src/database/enums/EmploymentType';
import { Skill } from 'src/database/entities/skill.entity';
import { Education } from 'src/database/entities/education.entity';
import { WorkHistory } from 'src/database/entities/workHistory.entity';
import { HourRate } from 'src/database/enums/HourRate';
import { IsCountry } from 'src/utils/customValidator/IsCountry';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFreelancerDto {
  @ApiProperty({ example: 'Shadow Fiend' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'Embedded systems' })
  @IsNotEmpty()
  @IsNumber()
  category: Category;

  @ApiProperty({ example: 'Ukraine' })
  @IsNotEmpty()
  @Validate(IsCountry, { message: 'invalid country' })
  country: string;

  @ApiProperty({ example: 'less 50$' })
  @IsNotEmpty()
  @IsEnum(HourRate)
  hourRate: HourRate;

  @ApiProperty({ example: 'Junior IOS dev' })
  @IsNotEmpty()
  @IsString()
  position: string;

  @ApiProperty({ example: 'Full-time' })
  @IsNotEmpty()
  @IsEnum(AvailableAmountOfHours)
  availableAmountOfHours: AvailableAmountOfHours;

  @ApiProperty({ example: 'remote' })
  @IsNotEmpty()
  @IsEnum(EmploymentType)
  employmentType: EmploymentType;

  @ApiProperty({ example: 'without exp' })
  @IsNotEmpty()
  @IsEnum(WorkExperience)
  workExperience: WorkExperience;

  @ApiProperty({ example: 'Beginner' })
  @IsNotEmpty()
  @IsEnum(EnglishLevel)
  englishLevel: EnglishLevel;

  @ApiProperty({ example: ['Git', 'React', 'Nest.js'] })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(3)
  skills: Skill[];

  @ApiProperty({
    description: 'Educations of the freelancer',
    example: [
      {
        institute: 'University of Developers',
        occupation: 'FullStack Developer',
        period: '3 years',
      },
    ],
  })
  @IsOptional()
  @IsArray()
  education: Education[];

  @ApiProperty({
    description: 'Work History of the freelancer',
    example: [
      {
        company: 'Developers Company',
        workPosition: 'FullStack Developer',
        period: '3 years',
      },
    ],
  })
  @IsOptional()
  @IsArray()
  workHistory: WorkHistory[];

  @ApiProperty({
    description: 'Other experiences of the freelancer',
    example: 'Data Analyst at Infra Tech Company',
  })
  @IsOptional()
  @IsString()
  otherExperience: string;
}

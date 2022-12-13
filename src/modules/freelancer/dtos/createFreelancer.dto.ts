import { IsArray, IsEnum, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { WorkExperience } from 'src/database/enums/WorkExperience';
import { EnglishLevel } from 'src/database/enums/EnglishLevel';
import { AvailableAmountOfHours } from 'src/database/enums/AvailableAmountOfHours';
import { EmploymentType } from 'src/database/enums/EmploymentType';
import { Education } from 'src/database/entities/education.entity';
import { WorkHistory } from 'src/database/entities/workHistory.entity';
import { HourRate } from 'src/database/enums/HourRate';
import { ApiProperty } from '@nestjs/swagger';
import { Categories, CountryName, Skills } from 'src/database/enums';

export class CreateFreelancerDto {
  @ApiProperty({ example: 'Shadow Fiend' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'Embedded systems' })
  @IsNotEmpty()
  @IsString()
  @IsEnum(Categories)
  category: Categories;

  @ApiProperty({ example: 'Ukraine' })
  @IsNotEmpty()
  @IsString()
  @IsEnum(CountryName, { each: true })
  country: CountryName;

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
  @IsEnum(Skills, { each: true })
  skills: Skills[];

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

import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { WorkExperience } from 'src/database/enums/WorkExperience';
import { Category } from 'src/database/entities/category.entity';
import { EnglishLevel } from 'src/database/enums/EnglishLevel';
import { AvailableAmountOfHours } from 'src/database/enums/AvailableAmountOfHours';
import { EmploymentType } from 'src/database/enums/EmploymentType';
import { Skill } from 'src/database/entities/skill.entity';
import { HourRate } from 'src/database/enums/HourRate';
import { IsCountry } from 'src/utils/customValidator/IsCountry';
import { Education } from 'src/database/entities/education.entity';
import { WorkHistory } from 'src/database/entities/workHistory.entity';

export class CreateFreelancerDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  @IsNumber()
  category: Category;

  @IsNotEmpty()
  @Validate(IsCountry, { message: 'invalid country' })
  country: HourRate;

  @IsNotEmpty()
  @IsEnum(HourRate)
  hourRate: HourRate;

  @IsNotEmpty()
  @IsString()
  position: string;

  @IsNotEmpty()
  @IsEnum(AvailableAmountOfHours)
  availableAmountOfHours: AvailableAmountOfHours;

  @IsNotEmpty()
  @IsEnum(EmploymentType)
  employmentType: EmploymentType;

  @IsNotEmpty()
  @IsEnum(WorkExperience)
  workExperience: WorkExperience;

  @IsNotEmpty()
  @IsEnum(EnglishLevel)
  englishLevel: EnglishLevel;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(3)
  skills: Skill[];

  @IsOptional()
  @IsArray()
  education: Education[];

  @IsOptional()
  @IsArray()
  workHistory: WorkHistory[];

  @IsOptional()
  @IsString()
  otherExperience: string;
}

import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Validate,
} from 'class-validator';
import { Category } from 'src/database/entities/category.entity';
import { Skill } from 'src/database/entities/skill.entity';
import { IsCountry } from 'src/utils/customValidator/IsCountry';
import { HourRate } from 'src/database/enums/HourRate';
import { WorkExperience } from 'src/database/enums/WorkExperience';
import { EnglishLevel } from 'src/database/enums/EnglishLevel';
import { AvailableAmountOfHours } from 'src/database/enums/AvailableAmountOfHours';
import { EmploymentType } from 'src/database/enums/EmploymentType';

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
}

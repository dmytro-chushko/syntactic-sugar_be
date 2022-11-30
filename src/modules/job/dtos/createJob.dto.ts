import { IsNotEmpty, IsString } from 'class-validator';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  positionForJob: string;

  @IsString()
  @IsString()
  description: string;
}

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChatDto {
  @IsString()
  @IsNotEmpty()
  freelancerId: string;

  @IsString()
  @IsNotEmpty()
  employerId: string;

  @IsString()
  @IsNotEmpty()
  jobId: string;
}

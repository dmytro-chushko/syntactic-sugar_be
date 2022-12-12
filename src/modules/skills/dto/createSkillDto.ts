import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSkillDto {
  @ApiProperty({ example: 'Java Script / Frontend' })
  @IsString()
  @IsNotEmpty()
  name: string;
}

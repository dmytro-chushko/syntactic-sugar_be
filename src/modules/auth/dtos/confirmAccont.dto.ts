import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ConfirmAccountDto {
  @ApiProperty({ example: 'skfmv-139d-dd-smsl' })
  @IsNotEmpty()
  id: string;
}

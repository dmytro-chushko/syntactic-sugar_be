import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateOfferDto {
  @ApiProperty({ example: 'asdfasdf-asdfcv-sdf' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  isAccepted: boolean;

  @ApiProperty({ example: 'asdfasdf-asdfcv-sdf' })
  @IsString()
  freelancerId: string;

  @ApiProperty({ example: 'asdfasdf-asdfcv-sdf' })
  @IsString()
  chatId: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateOfferDto {
  @ApiProperty({ example: '500' })
  @IsString()
  hourRate?: string;

  @ApiProperty({ example: '2f9f5724-a81f-4d80-8571-616e27bff201' })
  @IsString()
  @IsNotEmpty()
  freelancerId: string;

  @ApiProperty({ example: '2f9f5724-a81f-4d80-8571-616e27bff201' })
  @IsString()
  @IsNotEmpty()
  jobId: string;
}

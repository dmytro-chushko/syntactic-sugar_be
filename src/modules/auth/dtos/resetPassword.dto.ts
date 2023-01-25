import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY0OGUyZDk0LWYyODEtNGVjMi1iMzk2LWNiYzgwN2FhY2UwYSIsImVtYWlsIjoia3NlbmlqYWtvbWlzYXJvdmFAZ21haWwuY29tIiwicm9sZSI6IkdVRVNUIiwiaWF0IjoxNjcxNTI4MjY4LCJleHAiOjE2NzE2MTQ2Njh9._sX73s1S3O8v0MEL14CYmYHFPgTy57Ginnoo-Uw1XRM',
  })
  token: string;

  @ApiProperty({
    example: '12345678',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

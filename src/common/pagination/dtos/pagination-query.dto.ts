// this DTO is not for a post request, it's for the query

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty({
    default: 10,
  })
  @IsOptional()
  @IsPositive()
  limit?: number = 10; // implicit conversion enabled in the main.ts
  @ApiProperty({
    default: 1,
  })
  @IsOptional()
  @IsPositive()
  page?: number = 1; // implicit conversion enabled in the main.ts
}

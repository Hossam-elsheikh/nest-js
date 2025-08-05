import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetUsersParamDTO {
  @ApiPropertyOptional({
    description:'get user with a specific id',
    example:1234
  }) // swagger 
  @IsOptional()
  
  @IsInt() 
  @Type(() => Number)
  id?: number;
}

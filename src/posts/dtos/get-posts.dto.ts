import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

export class GetPostsBaseDto {
  @ApiProperty({
    default: new Date(),
    required:false
  })
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @ApiProperty({
    default: new Date(),
    required:false
  })
  @IsDate()
  @IsOptional()
  endDate?: Date;
}

// this intersection type mix the 2 dtos
export class GetPostsDto extends IntersectionType(
  GetPostsBaseDto,
  PaginationQueryDto,
) {}

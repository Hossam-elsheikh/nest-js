import { IsArray, IsEnum, isInt, IsInt, IsISO8601, IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { postStatus } from '../enums/postStatus.enum';
import { postType } from '../enums/postType.enum';
import { CreatePostMetaOptionsDTO } from '../../meta-options/dtos/create-post-meta-options.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { Tag } from 'src/tags/tag.entity';

export class MetaOption {
  key: string;
  value: string;
}

export class CreatePostDTO {
  @ApiProperty({
    example:'new post',
    description:'post title'
  })
  @IsString()
  @MaxLength(512)
  @MinLength(4)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    enum:postType,
  })
  @IsEnum(postType)
  @IsNotEmpty()
  postType: postType;

  @ApiProperty({
    example:'my-url'
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" with no spaces, ex: "my-url"',
  })
  slug: string;

  @ApiProperty({
    enum:postStatus
  })
  @IsEnum(postStatus)
  @IsNotEmpty()
  status: postStatus;

  @ApiPropertyOptional({
    example:'content of the post'
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    example:'{"json":"string"}'
  })
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional({
    example:'https://image.com'
  })
  @IsUrl()
  @MaxLength(1024)
  @IsOptional()
  featuredImageUrl?: string;

  @ApiPropertyOptional()
  @IsISO8601()
  @IsOptional()
  publishOn?: Date;

  @ApiPropertyOptional({
    example:['one1','two2']
  })
  @IsOptional()
  @IsArray()
  @IsInt({each:true}) // this check each value is string in the array
  tags?: number[];

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested({each:true})
  @Type(()=>CreatePostMetaOptionsDTO) // validate each against dto
  metaOptions?: CreatePostMetaOptionsDTO ;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  authorId:number

}

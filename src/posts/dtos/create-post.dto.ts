import { IsArray, IsEnum, IsISO8601, IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MinLength, ValidateNested } from 'class-validator';
import { postStatus } from '../enums/postStatus.enum';
import { postType } from '../enums/postType.enum';
import { CreatePostMetaOptionsDTO } from './create-post-meta-options.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
  @IsString({each:true}) // this check each value is string in the array
  @MinLength(3,{each:true}) // this check each value is of min 3 chars in the array
  tags?: string[];

  @ApiPropertyOptional({
    type:'array',
    required:false,
    items:{
      type:'object',
      properties:{
        key:{
          type:'string',
          description:'the key can be any string identifier for your meta option',
          example:'sidebatEnabled'
        },
        value:{
          type:'any',
          description:'any value ',
          example:true
        }
      }
    }
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({each:true})
  @Type(()=>CreatePostMetaOptionsDTO) // validate each against dto
  metaOptions?: CreatePostMetaOptionsDTO[];
}

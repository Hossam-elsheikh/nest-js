import { CreatePostDTO } from './create-post.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';


// patchPostDTO inherites all the props of CreatePostDTO but all are optional
// notice here that we've imported PartialType from swagger not from mapped-types, so that we can inherits swagger doc configs
export class PatchPostDTO extends PartialType(CreatePostDTO) {
  @ApiProperty({
    description:'the ID of the post that need to be updated'
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
}

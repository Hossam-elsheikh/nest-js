import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { CreatePostDTO } from './dtos/create-post.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PatchPostDTO } from './dtos/patch-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {

  }
  @Get('{/:id}') // an optional param
  public getPosts(@Param('userId') userId:string){
    return this.postsService.findAll(userId)
  }

  @ApiOperation({
    summary:'Creates a new Blog post'
  })
  @ApiResponse({
    status:201,
    description:'post createed succesfully'
  })
  @Post()
  public createPost(@Body() createPostDto:CreatePostDTO){
    return createPostDto
  }

 @ApiOperation({
    summary:'Updates an existing Blog post'
  })
  @ApiResponse({
    status:200,
    description:'post updated succesfully'
  })
  @Patch()
  public uodatePost(@Body() patchPostDto:PatchPostDTO){
    return patchPostDto
  }
}

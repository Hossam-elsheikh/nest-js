import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { CreatePostDTO } from './dtos/create-post.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PatchPostDTO } from './dtos/patch-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {

  }
  @Get('{/:id}') // an optional param
  public getPosts(){
    return this.postsService.findAll()
  }

  @ApiOperation({
    summary:'Creates a new Blog post'
  })
  @ApiResponse({
    status:201,
    description:'post createed succesfully'
  })

  // one2one 
  // @Post()
  // public createPost(@Body() createPostDto:CreatePostDTO){
  //   return this.postsService.createPost(createPostDto)
  // }

  // one2many
  @Post()
  public createPostByUser(@Body() createPostDto:CreatePostDTO){
    return this.postsService.createPostByUser(createPostDto)
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
    return this.postsService.update(patchPostDto)
  }

  @Delete()
  public deletePost(@Query('id',ParseIntPipe) id:number){
    return this.postsService.delete(id)
  }
}

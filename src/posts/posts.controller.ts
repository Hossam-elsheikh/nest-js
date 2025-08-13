import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  SetMetadata,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { CreatePostDTO } from './dtos/create-post.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PatchPostDTO } from './dtos/patch-post.dto';
import { GetPostsDto } from './dtos/get-posts.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { AcitveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserInterface } from 'src/auth/interfaces/active-user.interface';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get()
  // @SetMetadata('authType', 'none') // demonstration of what the nature of the decorator is
  public getPosts(@Query() postQuery: GetPostsDto) {
    return this.postsService.findAll(postQuery);
  }

  @ApiOperation({
    summary: 'Creates a new Blog post',
  })
  @ApiResponse({
    status: 201,
    description: 'post createed succesfully',
  })

  // one2one
  // @Post()
  // public createPost(@Body() createPostDto:CreatePostDTO){
  //   return this.postsService.createPost(createPostDto)
  // }

  // one2many
  @Post()
  public createPostByUser(
    @Body() createPostDto: CreatePostDTO,
    @AcitveUser() user: ActiveUserInterface, // this is a custom param devorator
  ) {
    
    return this.postsService.create(createPostDto,user);
  }

  @ApiOperation({
    summary: 'Updates an existing Blog post',
  })
  @ApiResponse({
    status: 200,
    description: 'post updated succesfully',
  })
  @Patch()
  public uodatePost(@Body() patchPostDto: PatchPostDTO) {
    return this.postsService.update(patchPostDto);
  }

  @Delete()
  public deletePost(@Query('id', ParseIntPipe) id: number) {
    return this.postsService.delete(id);
  }
}

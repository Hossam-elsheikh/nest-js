import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreatePostDTO } from '../dtos/create-post.dto';
import { UsersService } from 'src/users/providers/users.service';
import { TagService } from 'src/tags/providers/tag.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { AcitveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserInterface } from 'src/auth/interfaces/active-user.interface';

@Injectable()
export class CreatePostProvider {
  constructor(
    private readonly userService: UsersService,
    private readonly tagService: TagService,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}
  public async create(
    createPostDto: CreatePostDTO,
     user: ActiveUserInterface,
  ) {
    // find the user from the user service
    let author;
    let tags;
    try {
      author = await this.userService.findOneById(user.sub);
      tags = await this.tagService.findMultibleTags(createPostDto.tags || []);
    } catch (error) {
      throw new ConflictException(error);
    }
    console.log(tags,createPostDto.tags);
    
    if (createPostDto.tags?.length !== tags.length){
        throw new BadRequestException('please check your tags ids')
    }
  
      let post = this.postRepository.create({
        ...createPostDto,
        author,
        tags,
      });
      try {
        
          return await this.postRepository.save(post);
      } catch (error) {
        throw new ConflictException(error,{
            description:'insure post slug is unique'
        })
      }
    
  }
}

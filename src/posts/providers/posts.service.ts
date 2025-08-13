import {
  BadRequestException,
  Body,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDTO } from '../dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { TagService } from 'src/tags/providers/tag.service';
import { PatchPostDTO } from '../dtos/patch-post.dto';
import { GetPostsDto } from '../dtos/get-posts.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { CreatePostProvider } from './create-post.provider';
import { ActiveUserInterface } from 'src/auth/interfaces/active-user.interface';

@Injectable()
export class PostsService {
  // injecting user service
  constructor(
    private readonly userService: UsersService,
    private readonly tagService: TagService,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,

    private readonly paginationProvider: PaginationProvider,

    private readonly createPostProvider: CreatePostProvider,
  ) {}

  public async create(createPostDto: CreatePostDTO, user: ActiveUserInterface) {
    return await this.createPostProvider.create(createPostDto, user);
  }

  public async findAll(postQuery: GetPostsDto): Promise<Paginated<Post>> {
    // before using pagination provider
    // let posts = await this.postRepository.find({
    //   skip:(postQuery.page||1-1) * (postQuery.limit||10),
    //   take:postQuery.limit,    // take n posts at a time

    // });
    // return posts;

    let posts = await this.paginationProvider.paginateQuery(
      {
        limit: postQuery.limit,
        page: postQuery.page,
      },
      this.postRepository,
    );
    return posts;
  }

  public async delete(id: number) {
    await this.postRepository.delete(id); // this will delete the post and the metaoption related to it

    // confirmation
    return { delted: true, id };
  }

  public async update(patchPostDto: PatchPostDTO) {
    // find the tags
    let tags;
    if (patchPostDto.tags) {
      try {
        tags = await this.tagService.findMultibleTags(patchPostDto.tags || []);
      } catch (error) {
        throw new RequestTimeoutException(
          'Could not connect to database, please try again later',
        );
      }
    }

    if (!tags || tags.length !== patchPostDto.tags) {
      throw new BadRequestException(
        'some tags are not in the databse, please check your tags ids',
      );
    }

    let post;
    // find the post
    try {
      post = await this.postRepository.findOneBy({ id: patchPostDto.id });
    } catch (error) {
      throw new RequestTimeoutException(
        'Could not connect to database, please try again later',
      );
    }

    if (!post) {
      throw new BadRequestException('no posts found with the id provided!');
    }

    // update the properties
    if (post) {
      post.title = patchPostDto.title ?? post.title;
      post.postType = patchPostDto.postType ?? post.postType;
      post.slug = patchPostDto.slug ?? post.slug;
      post.status = patchPostDto.status ?? post.status;
      // assign the new tags
      if (tags) {
        post.tags = tags;
      }

      try {
        await this.postRepository.save(post);
      } catch (error) {
        throw new RequestTimeoutException(
          'Could not connect to database, please try again later',
        );
      }
    }

    return { message: 'Post updated', post };

    // save the post
  }
}

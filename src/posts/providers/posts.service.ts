import { Body, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDTO } from '../dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { TagService } from 'src/tags/providers/tag.service';
import { PatchPostDTO } from '../dtos/patch-post.dto';

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
  ) {}

  // one 2 one deomnstration of post and metaoption relationship
  public async createPost(@Body() createPostDto: CreatePostDTO) {
    // without cascade you would do these steps
    // 1-createing metaoption first if provided
    // let metaOption = createPostDto.metaOptions
    //   ? this.metaOptionRepository.create(createPostDto.metaOptions)
    //   : null;
    // 2-save if created
    // if(metaOption){
    //   await this.metaOptionRepository.save(metaOption)
    // }
    // 3-create the post
    // let post = this.postRepository.create(createPostDto)
    // 4-add metaoptions if provided
    // if(metaOption){
    //   post.metaOptions = metaOption
    // }
    // but with the cascade enabled it's all done behind the scenes
    // let post = this.postRepository.create(createPostDto);
    // return await this.postRepository.save(post);
  }

  // one 2 many demonstration of user and post relationship

  public async createPostByUser(@Body() createPostDto: CreatePostDTO) {
    // find the user from the user service
    let author = await this.userService.findOneById(createPostDto.authorId);

    let tags = await this.tagService.findMultibleTags(createPostDto.tags || []);

    if (author) {
      let post = this.postRepository.create({
        ...createPostDto,
        author,
        tags,
      });
      return await this.postRepository.save(post);
    }
    return 'user not found';
  }

  public async findAll() {
    let posts = await this.postRepository.find({
      // instead of this, set eager in the @onetoone decorator config
      // relations:{
      //   metaOptions:true, // to fetch metaoptions along with the post
      //   author:true
      //   tags:true
      // }
    });
    return posts;
  }

  public async delete(id: number) {
    // uni-directional one2one
    // find the post
    // let post = await this.postRepository.findOneBy({id})

    // delete the post first
    // await this.postRepository.delete({id})

    // delete the metaoption
    // await this.metaOptionRepository.delete({id:post?.metaOptions?.id})

    // bi-directional one2one > cascade delete
    await this.postRepository.delete(id); // this will delete the post and the metaoption related to it

    // confirmation
    return { delted: true, id };
  }

  public async update(patchPostDto: PatchPostDTO) {
    // find the tags
    let tags = await this.tagService.findMultibleTags(patchPostDto.tags || []);

    // find the post
    let post = await this.postRepository.findOneBy({ id: patchPostDto.id });

    // update the properties
    if (post) {
      post.title = patchPostDto.title ?? post.title;
      post.postType = patchPostDto.postType ?? post.postType;
      post.slug = patchPostDto.slug ?? post.slug;
      post.status = patchPostDto.status ?? post.status;
      // assign the new tags
      post.tags = tags
      return await this.postRepository.save(post)
    }

    return 'post not found'

    // save the post
  }
}

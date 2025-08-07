import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tag.entity';
import { In, Repository } from 'typeorm';
import { CreateTagDTO } from '../dtos/create-tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  public async createTag(createTagDto: CreateTagDTO) {
    let tag = this.tagRepository.create(createTagDto);

    return await this.tagRepository.save(tag);
  }

  public async findMultibleTags(tags: number[]) {
    let results = await this.tagRepository.find({
      where: {
        id: In(tags), // returns all the records that matches the arr of ids
      },
    });

    return results;
  }

  public async deleteTag(id: number) {
    await this.tagRepository.delete(id);

    return { deleted: true, id };
  }

  // this method for soft delete
  public async softRemove(id:number){
    // soft delete just create a timestapm and not removing from the db
    await this.tagRepository.softDelete(id)
    return { deleted: true, id };

  }
}

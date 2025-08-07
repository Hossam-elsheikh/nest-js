import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from '../meta-option.entity';
import { Repository } from 'typeorm';
import { CreatePostMetaOptionsDTO } from '../dtos/create-post-meta-options.dto';

@Injectable()
export class MetaOptionService {
  constructor(
    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,
  ) {}

  public async createMetaOption(
    createPostMetaOptionsDTO: CreatePostMetaOptionsDTO,
  ) {
    let metaOption = this.metaOptionRepository.create(createPostMetaOptionsDTO);

    return await this.metaOptionRepository.save(metaOption)
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { MetaOptionService } from './providers/meta-option.service';
import { CreatePostMetaOptionsDTO } from './dtos/create-post-meta-options.dto';

@Controller('meta-options')
export class MetaOptionsController {
  constructor(private readonly metaOptionSerivce: MetaOptionService) {}


  @Post()
  public creatMetaOption(@Body() createPostMetaOptionsDto:CreatePostMetaOptionsDTO){
    return this.metaOptionSerivce.createMetaOption(createPostMetaOptionsDto)
  }
}

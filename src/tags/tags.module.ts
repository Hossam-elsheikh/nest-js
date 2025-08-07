import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { TagsController } from './tags.controller';
import { TagService } from './providers/tag.service';

@Module({
    imports:[TypeOrmModule.forFeature([Tag])],
    controllers: [TagsController],
    exports:[TagService],
    providers:[TagService]
})
export class TagsModule {

}

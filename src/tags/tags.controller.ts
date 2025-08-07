import { Body, Controller, Delete, ParseIntPipe, Post, Query } from '@nestjs/common';
import { TagService } from './providers/tag.service';
import { CreateTagDTO } from './dtos/create-tag.dto';

@Controller('tags')
export class TagsController {
    constructor(private readonly tagService:TagService){}

    @Post()
    public createTag(@Body() createTagDto:CreateTagDTO){
        return this.tagService.createTag(createTagDto)
    }

    @Delete()
    public deleteTag(@Query('id',ParseIntPipe) id:number){
        return this.tagService.deleteTag(id)
    }

    // this endpoint to test soft delete
    @Delete('soft-delete')
    public softDelete(@Query('id',ParseIntPipe) id:number){
        // this will only affect the fetch methods, but not delete the records itself
        // i.e the data won't be there if you fetch them, but the're still in the db, even the relations and junction tables
        // this could be usefull in archiving things or deleting things after a period 
        return this.tagService.softRemove(id)
    }
}

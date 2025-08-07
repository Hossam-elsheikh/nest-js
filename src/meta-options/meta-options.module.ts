import { Module } from '@nestjs/common';
import { MetaOptionsController } from './meta-options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOption } from './meta-option.entity';
import { MetaOptionService } from './providers/meta-option.service';

@Module({
  controllers: [MetaOptionsController],
  providers:[MetaOptionService],
  imports:[TypeOrmModule.forFeature([MetaOption])]
})
export class MetaOptionsModule {}

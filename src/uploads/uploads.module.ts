import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './providers/uploads.service';
import { UploadToAwsProviderService } from './providers/upload-to-aws.provider.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upload } from './upload.entity';

@Module({
  controllers: [UploadsController],
  providers: [UploadsService, UploadToAwsProviderService],
  imports:[TypeOrmModule.forFeature([Upload])]
})
export class UploadsModule {}

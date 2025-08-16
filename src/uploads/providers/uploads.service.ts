import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Upload } from '../upload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadToAwsProviderService } from './upload-to-aws.provider.service';
import { ConfigService } from '@nestjs/config';
import { UploadFileInterface } from '../interfaces/upload-file.interface';
import { FileTypes } from '../enums/file-types.enum';
@Injectable()
export class UploadsService {
  constructor(
    @InjectRepository(Upload)
    private uploadRepository: Repository<Upload>,
    private uploadToAwsProvider: UploadToAwsProviderService,
    private readonly configService: ConfigService,
  ) {}
  public async uploadFile(file: Express.Multer.File) {
    // throw error for unsupported MIME types
    if (
      !['image/gif', 'image/jpeg', 'image/jpg', 'image/png'].includes(
        file.mimetype,
      )
    ) {
      throw new BadRequestException('MIME type not supported!');
    }
    try {
      // upload the file to s3 bucket
      const name = await this.uploadToAwsProvider.fileUpload(file);

      // generate a new entry in the db
      const uploadFile: UploadFileInterface = {
        name,
        path: `https://${this.configService.get('appConfig.awsCloudFrontUrl')}/${name}`,
        type: FileTypes.IMAGE,
        mime: file.mimetype,
        size: file.size,
      };
      const upload = this.uploadRepository.create(uploadFile);
      return await this.uploadRepository.save(upload);
    } catch (error) {
      throw new ConflictException(error);
    }
  }
}

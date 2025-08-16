import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import * as path from 'path';
import { v4 as uuid4 } from 'uuid';
@Injectable()
export class UploadToAwsProviderService {
  constructor(private readonly configService: ConfigService) {}

  public async fileUpload(file: Express.Multer.File) {
    // creating an instance from s3
    const s3 = new S3();
    try {
      const uploadResult = await s3
        .upload({
          Bucket: this.configService.get('appConfig.awsBucketName') || '',
          Body: file.buffer,
          Key: this.generateFileName(file),
          ContentType: file.mimetype, // important
        })
        .promise();
      return uploadResult.Key;
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }

  private generateFileName(file: Express.Multer.File) {
    // to insure unique file names
    const name = file.originalname.split('.')[0].replace(/\s+/g, '').trim();
    const extention = path.extname(file.originalname);
    const timeStamp = new Date().getTime().toString().trim();
    return `${name}-${timeStamp}-${uuid4()}${extention}`;
  }
}

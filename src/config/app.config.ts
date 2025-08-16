import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  environment: process.env.NODE_ENV || 'production',
  apiVersion: process.env.API_VERSION,
  awsBucketName: process.env.S3_BUCKET_NAME,
  awsRegion: process.env.S3_BUCKET_REGION,
  awsCloudFrontUrl: process.env.CLOUDFRONT_DISTRO_URL,
  awsAccessKeyId: process.env.S3_ACCESS_KEY,
  awsSecretAccessKey: process.env.S3_SECRET_KEY,
  mailHost:process.env.MAIL_HOST,
  smtpUserName:process.env.SMTP_USERNAME,
  smtpPassword:process.env.SMTP_PASSWORD
}));

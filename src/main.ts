import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      // this enableImplicitConversion make conversion automatic so you don't have to use it before each prop in dto
    }),
  );

  // swagger configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('use this base API url http://localhost:3001')
    .setTermsOfService('link to terms of service') // provide a link
    .setLicense('FREE License', 'license docs link')
    .addServer('http://localhost:3001')
    .setVersion('1.0')
    .build();
  // instantiate document
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);
  // setup aws sdk for file upload to aws s3 bucket
  const configService = app.get(ConfigService); // accessing the config service
  config.update({
    credentials: {
      accessKeyId: configService.get('appConfig.awsAccessKeyId') || '',
      secretAccessKey: configService.get('appConfig.awsSecretAccessKey') || '',
    },
    region: configService.get('appConfig.awsRegion'),
  });
  app.enableCors(); // cors enabled
  // app.useGlobalInterceptors(new DataResponseInterceptor())    // moved to app.module
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();

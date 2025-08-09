import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('use this base API url http://localhost:3001')
    .setTermsOfService('link to terms of service') // provide a link
    .setLicense('FREE License', 'license docs link')
    .addServer('http://localhost:3001')
    .setVersion('1.0')
    .build();
  // instantiate document
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();

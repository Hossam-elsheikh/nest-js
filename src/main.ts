import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // instead of passing it on each request coming
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // insures that any data not in dto wo'nt be passed to the controller
      forbidNonWhitelisted:true, // forbids and throws an error if data not in dto passed
      transform: true // transform the incoming request to an instance to dto class after validation
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

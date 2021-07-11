import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials:true,
    origin: ['http://localhost:4200']
  });
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();

import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Shedule } from './utils/shedule.job';
import { ConfigTools } from './utils/config.tools';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials:true,
    origin: ['http://localhost:4200']
  });
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  await app.listen(3000);

  ConfigTools.OnInit();
  Shedule.thumbnailControl();

}
bootstrap();

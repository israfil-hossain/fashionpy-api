import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { TransformationInterceptor } from './responseInterceptor';
import { configureSwaggerUI } from 'config/swagger.config';
import config from "config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformationInterceptor());
  configureSwaggerUI(app);
  await app.listen(config.get<string>('port'),() => {
    console.log(`Server is Running on port ${config.get<string>('port')}`);
  });
}
bootstrap();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { TransformInterceptor } from './common/interceptor/interceptor.transform';
//import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { configureSwaggerUI } from './swagger.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { abortOnError: false });
  
  app.enableCors({
    origin: 'http://localhost:5173', //specific frontend URL
    credentials: true, //Allow cookies/headers auth
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  //app.useGlobalInterceptors(new LoggingInterceptor());
  configureSwaggerUI(app);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
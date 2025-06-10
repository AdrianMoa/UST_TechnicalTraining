import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Version, VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { TransformInterceptor } from './common/interceptor/interceptor.transform';
//import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { configureSwaggerUI } from './swagger.config';
import helmet from 'helmet';
import * as compression from 'compression';

const PORT = process.env.PORT ?? 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN ?? '*'; //to avoid CORS error on client, specify exact frontend URL

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { abortOnError: false });
  
  app.enableCors({ origin: CORS_ORIGIN, credentials: true });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  //app.useGlobalInterceptors(new LoggingInterceptor());
  configureSwaggerUI(app);
  app.enableVersioning({ type: VersioningType.URI })
  app.use(helmet());
  app.use(compression());

  await app.listen(PORT, () => {
    console.log(`🚀 Application running at port ${PORT}`)
  });
}

bootstrap();
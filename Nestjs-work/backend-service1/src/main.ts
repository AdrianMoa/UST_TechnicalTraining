import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import { TransformInterceptor } from './common/interceptor/interceptor.transform';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { abortOnError: false, cors: true });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Backend NestJS  Documentation')
    .setDescription('Swagger documentation for NestJS API project')
    .setVersion('1.0')
    .addTag('UST Course')
    .build();
  
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };
  
  const documentFactory = () => SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app,  documentFactory);

  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

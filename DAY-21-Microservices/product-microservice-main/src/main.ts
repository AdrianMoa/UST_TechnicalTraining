import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const logger = new Logger('Microservice');

async function bootstrap() {
  try {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3001,
      },
    });
    
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.listen();
    logger.log('Microservice is listening at port 3001');

  } catch (error) {
    logger.error('Error starting microservice', error.stack);
    process.exit(1);
  }
}
bootstrap();

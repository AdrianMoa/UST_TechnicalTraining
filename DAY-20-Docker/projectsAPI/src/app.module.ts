import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProjectModule } from './module/project.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { UsersModule } from './module/users.module';
import { AuthModule } from './module/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        JWT_ACCESS_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION: Joi.string().required(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      }
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI ?? '', {dbName: 'projectdb'}), //import for mongodb principal DB
    ProjectModule, //Project Module that maps providers and controller related to Project
    UsersModule,
    AuthModule,
  ],
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('projects');
  }
}

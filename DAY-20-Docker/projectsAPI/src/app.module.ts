import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProjectModule } from './module/project.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { UsersModule } from './module/users.module';
import { AuthModule } from './module/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      validationSchema: Joi.object({
        DATABASE_URI: Joi.string().uri().required(),
        JWT_ACCESS_SECRET: Joi.string().min(15).required(),
        JWT_ACCESS_TOKEN_EXPIRATION: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().min(15).required(),
        JWT_REFRESH_TOKEN_EXPIRATION: Joi.string().required(),
        PORT: Joi.number().default(4000),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      }
    }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10}]),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URI'),
      }),
    }),

    //feature modules
    ProjectModule, //Project Module that maps providers and controller related to Project
    UsersModule,
    AuthModule,
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('projects');
  }
}

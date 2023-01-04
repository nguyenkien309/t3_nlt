import { UploadFileModule } from './modules/upload-file/upload-file.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';
import { NodeMailerModule } from './modules/node-mailer/node-mailer.module';
import { BullModule } from '@nestjs/bull';
import { QueueModule } from './modules/queue/queue.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { RedisModule } from './modules/redis/redis.module';
dotenv.config();

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    OrderModule,
    ProductModule,
    AuthModule,
    UploadFileModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        redis: {
          host: config.get<string>('REDIS_HOST'),
          port: config.get<number>('REDIS_PORT'),
        },
      }),
    }),
    QueueModule,
    RedisModule,
    NodeMailerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

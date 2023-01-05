import { Global, Module } from '@nestjs/common';
import { NodeMailerService } from './node-mailer.service';
import { NodeMailerController } from './node-mailer.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { NodeMailerConsumer } from './node-mailer.consumer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get<string>('NODEMAILER_HOST'),
          secure: config.get<boolean>('NODEMAILER_SECURE'),
          port: config.get<number>('NODEMAILER_PORT') || 465,
          auth: {
            user: config.get<string>('NODEMAILER_USER'),
            pass: config.get<string>('NODEMAILER_PASS'),
          },
        },
        defaults: {
          from: `"No Reply" <no-reply@localhost>' <${config.get<string>(
            'NODEMAILER_USER',
          )}>`,
        },
        template: {
          dir: join(__dirname, './../../../public/templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    BullModule.registerQueueAsync({
      name: 'QueueMail',
    }),
  ],
  controllers: [NodeMailerController],
  providers: [NodeMailerService, NodeMailerConsumer],
})
export class NodeMailerModule {}

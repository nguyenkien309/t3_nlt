import { Global, Module } from '@nestjs/common';
import { NodeMailerService } from './node-mailer.service';
import { NodeMailerController } from './node-mailer.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';

// @Module({
// imports: [
//   MailerModule.forRoot({
//     transport: {
//       host: 'smtp.sendgrid.net',
//       port: 465,
//       auth: {
//         user: 'apikey',
//         pass: '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',
//         //   user: 'apikey',
//         //   pass: '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',
//       },
//     },
//   }),
// ],

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          // name: config.get<string>('NODEMAILER_HOST'),
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
            'NODEMAILER_FROM',
          )}>`,
        },
        preview: false, // true
      }),
    }),
  ],
  controllers: [NodeMailerController],
  providers: [NodeMailerService],
})
export class NodeMailerModule {}

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NodeMailerService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(email: string) {
    await this.mailerService.sendMail({
      to: email,
      from: 'this is from',
      subject: 'this is subject',
      template: 'welcome',
      context: {
        text: 'test from botnvk1',
      },
    });
    return true;
  }
}

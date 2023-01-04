import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
@Injectable()
export class NodeMailerService {
  constructor(
    @InjectQueue('QueueMail') private mailQueue: Queue,
    private readonly mailerService: MailerService,
  ) {}

  async sendConfirmEmail(email: string) {
    try {
      const Queue = await this.mailQueue.add('confirm', email);
      return Queue;
    } catch (err) {
      return false;
    }
  }

  async sendMail(email: string) {
    this.mailerService
      .sendMail({
        to: email,
        from: 'this is from',
        subject: 'this is subject',
        template: 'welcome',
        context: {
          text: 'test from botnvk1',
        },
      })
      .then((success) => {
        console.log(success);
        return success;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

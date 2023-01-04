import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { NodeMailerService } from './node-mailer.service';

@Processor('QueueMail')
export class NodeMailerConsumer {
  private readonly logger = new Logger(this.constructor.name);
  constructor(private readonly mailService: NodeMailerService) {}

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name}. Data: ${JSON.stringify(
        job.data,
      )}`,
    );
  }

  @OnQueueCompleted()
  onComplete(job: Job) {
    console.log(`Completed job ${job.id} of type ${job.name}.`);
  }

  @OnQueueFailed()
  onError(job: Job<any>, error) {
    console.log(
      `Failed job ${job.id} of type ${job.name}: ${error.message}`,
      error.stack,
    );
  }

  @Process('confirm')
  async sendWelcomeEmail(queue: Job<string>) {
    console.log('Sending confirm email');
    try {
      console.log('queue.data: ', queue.data);
      return await this.mailService.sendMail(queue.data);
    } catch (error) {
      this.logger.error('Failed: ', error.stack);
      throw error;
    }
  }
}

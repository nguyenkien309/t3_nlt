import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('message-queue')
export class MessageConsumer {
  @Process('message-job')
  QueueData(queue: Job<unknown>) {
    console.log(queue.data);
  }
}

import { QueueController } from './queue.controller';
import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { BullModule } from '@nestjs/bull';
import { MessageConsumer } from './queue.consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'message-queue',
    }),
  ],
  controllers: [QueueController],
  providers: [QueueService, MessageConsumer],
  exports: [QueueService],
})
export class QueueModule {}

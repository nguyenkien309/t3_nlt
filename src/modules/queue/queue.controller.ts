import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueueService } from './queue.service';

@ApiTags('v1/queue')
@Controller('v1/queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Get('/send')
  async QueueTest(@Query('msg') msg: string) {
    await this.queueService.sendMessage(msg);
    return msg;
  }
}

import { Controller } from '@nestjs/common';
import { Get, Query } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { NodeMailerService } from './node-mailer.service';
import { MailerService } from '@nestjs-modules/mailer';

@ApiTags('v1/node-mailer')
@Controller('v1/node-mailer')
export class NodeMailerController {
  constructor(
    private readonly nodeMailerService: NodeMailerService,
    private readonly mailService: MailerService,
  ) {}

  @Get()
  async test(@Query('email') email: string) {
    return await this.nodeMailerService.sendConfirmEmail(email);
  }
}

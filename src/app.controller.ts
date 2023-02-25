import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SQSService } from './aws/sqs/sqs.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    new SQSService().sendMessage({ messageType: 'Email', body: 'testSQS1' });
  }
}

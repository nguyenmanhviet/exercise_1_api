import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SQSModule } from './aws/sqs/sqs.module';

@Module({
  imports: [SQSModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

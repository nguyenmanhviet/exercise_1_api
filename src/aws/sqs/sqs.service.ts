import { Injectable } from '@nestjs/common';
import { SQS } from 'aws-sdk';
import * as dotenv from 'dotenv';

interface MessageType {
  messageType: string;
  body: string;
}

let envCfg = process.env;

const fileEnv = dotenv.config({ path: `.env` });
envCfg = {
  ...envCfg,
  ...fileEnv.parsed,
};

@Injectable()
export class SQSService {
  private static instance: SQSService;
  private sqs: SQS;

  constructor() {
    this.sqs = new SQS({
      accessKeyId: envCfg.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: envCfg.AWS_SECRET_ACCESS_KEY || '',
      region: 'ap-southeast-1',
    });
  }

  getSQS(): SQS {
    return this.sqs;
  }

  static getInstance() {
    if (!SQSService.instance) {
      SQSService.instance = new SQSService();
    }
    return SQSService.instance;
  }

  sendMessage(message: MessageType) {
    const params: AWS.SQS.Types.SendMessageRequest = {
      MessageBody: JSON.stringify(message),
      QueueUrl: envCfg.SQS_URI || '',
      DelaySeconds: 10,
    };
    this.sqs.sendMessage(params, (err, data) => {
      if (err) {
        console.log(err);
      }
      console.log('send', data);
    });
  }
}

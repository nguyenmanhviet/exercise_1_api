import { Injectable, Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import AWS, { SES } from 'aws-sdk';

let envCfg = process.env;

const fileEnv = dotenv.config({ path: `.env` });
envCfg = {
  ...envCfg,
  ...fileEnv.parsed,
};

@Injectable()
export class SESService {
  /**
   * Method to send email without attachments
   * @param email
   * @returns
   */
  async sendEmail(message: any) {
    const ses = new SES({
      accessKeyId: envCfg.AWS_ACCESS_KEY_ID || '', // This specific key is required when working offline
      secretAccessKey: envCfg.AWS_SECRET_ACCESS_KEY || '',
      region: 'ap-southeast-1',
    });
    const sesParams = {
      Destination: {
        ToAddresses: ['thidaihoc29012000@gmail.com'],
      },
      Message: {
        Subject: {
          Data: 'Test SQS',
          Charset: 'UTF-8',
        },
        Body: {
          Text: {
            Data: `Sent message: ${message}.`,
            Charset: 'UTF-8',
          },
        },
      },
      Source: `vietmanh.nguyen@team.enouvo.com`,
    } as SES.Types.SendEmailRequest;
    const sendPromise = await ses.sendEmail(sesParams).promise();
    return sendPromise;
  }
}

new SESService().sendEmail('string');

@Module({
  providers: [SESService],
})
export class SESModule {}

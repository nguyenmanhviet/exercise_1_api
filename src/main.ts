import { InternalServerErrorException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SESModule, SESService } from './aws/ses/sesService';
// import { SQSHandler } from 'aws-lambda';

let cachedHandler: SESService;

module.exports.handler = async (event) => {
  try {
    if (!cachedHandler) {
      const nestApp = await NestFactory.createApplicationContext(SESModule);
      cachedHandler = nestApp
        .select(SESModule)
        .get(SESService, { strict: true });
    }
    await cachedHandler.sendEmail(event);
  } catch (err) {
    const message = (err as Error).message;
    throw new InternalServerErrorException(message);
  }
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();


import  {config} from 'dotenv';
config();

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {Logger, ValidationPipe} from '@nestjs/common';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }));
  const options = new DocumentBuilder()
    .setTitle('Prueba tecnica')
    .setDescription('Prueba tecnica para la vacante de backend nodejs imaginamos')
    .setVersion('1.0')
    .build();
    
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
  logger.log(`Server running in ${await app.getUrl()}`);
}
bootstrap();
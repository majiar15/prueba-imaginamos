
import * as dotenv  from 'dotenv';
dotenv.config();


import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {Logger, ValidationPipe} from '@nestjs/common';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  const PORT = process.env.PORT || 3000
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
  SwaggerModule.setup('/', app, document, {
    explorer: true,
    swaggerOptions:{
      filter: true,
      showRequestDuration: true
    }
  });
  await app.listen(PORT);
  logger.log(`Server running in ${await app.getUrl()}`);
}
bootstrap();
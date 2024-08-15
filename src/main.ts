import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Form API')
    .setDescription(
      'APi function to mongose and nextjs, only to post, get and delete',
    )
    .setVersion('1.0')
    .addTag('Form')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(
    cors({
      origin: 'http://localhost:3000', // Permitir solicitudes desde este origen
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true, // Permitir el envío de cookies
    }),
    cookieParser(),
  );
  await app.listen(3001);
}
bootstrap();

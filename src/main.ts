import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar CORS
  app.use(
    cors({
      origin: 'https://formulario-nextjs.onrender.com', // Permitir solicitudes desde este origen
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true, // Permitir el envío de cookies
    }),
  );
  await app.listen(3001);
}
bootstrap();

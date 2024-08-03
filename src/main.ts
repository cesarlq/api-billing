import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as fs from 'fs';

async function bootstrap() {
  let httpsOptions;
  try {
    httpsOptions = {
      key: fs.readFileSync('./src/cert/key.pem'),
      cert: fs.readFileSync('./src/cert/cert.pem'),
    };
  } catch (error) {
    console.error('Error reading SSL certificate files:', error);
    process.exit(1);
  }

  const app = await NestFactory.create(AppModule, { httpsOptions });
  // Configurar CORS
  app.use(
    cors({
      origin: 'https://main.d2le7ptoltic3y.amplifyapp.com', // Permitir solicitudes desde este origen
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true, // Permitir el envío de cookies
    }),
  );
  await app.listen(3001);
}
bootstrap();

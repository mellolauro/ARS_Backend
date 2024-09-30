import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
  origin: '*',
  methods:'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type, Authorization',
});

const server = app.getHttpServer();
const router = server._events.request._router;
Logger.log(router.stack.map((layer) => layer.route?.path).filter(Boolean), 'Registered Routes');

await app.listen(3333);
}
bootstrap();

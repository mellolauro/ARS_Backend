import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('ARS System - API')
    .setDescription('Sistema de controle ARS')
    .addBearerAuth({
      type: 'http',
      scheme:'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Enter token',
      in: 'header',
    }, 'KEY_AUTH',
  ) 
    .build();
    app.enableCors({
      origin: '*',
      methods:'GET,POST,PUT,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type, Authorization',
    });
    app.useGlobalPipes(new ValidationPipe({whitelist: true, transform: true}));
    app.enableVersioning();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });  

const server = app.getHttpServer();
const router = server._events.request._router;
Logger.log(router.stack.map((layer) => layer.route?.path).filter(Boolean), 'Registered Routes');


await app.listen(3333);
}
bootstrap();

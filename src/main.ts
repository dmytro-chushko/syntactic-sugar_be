import { NestFactory } from '@nestjs/core';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';
import * as path from 'path';
import { AppModule } from 'src/app.module';

async function start() {
  try {
    const PORT = process.env.PORT || 8090;
    const app = await NestFactory.create(AppModule, { cors: true });
    const config = new DocumentBuilder()
      .setTitle('Freelancer')
      .setDescription('DOCS Freelancer')
      .setVersion('1.0')
      .addTag('freelancer')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({
      allowedHeaders: ['content-type', 'authorization'],
      origin: process.env.CLIENT_HOST,
      credentials: true,
    });
    app.use(express.static(path.resolve(__dirname, 'modules/files/static')));

    return await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
start();

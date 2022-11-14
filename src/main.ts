import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function start() {
  const PORT = process.env.PORT || 8090;
  const app = await NestFactory.create(AppModule);
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
    allowedHeaders: ['content-type'],
    origin: 'http://localhost:4200',
    credentials: true,
  });
  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
start();

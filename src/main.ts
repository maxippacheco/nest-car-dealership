import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function main() {
  const app = await NestFactory.create(AppModule);

  // PIPES GLOBALES
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //remover data basura
      forbidNonWhitelisted: true // te avisa que data no deberia existir
    })
  )

  await app.listen(3000);
}
main();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
void bootstrap();

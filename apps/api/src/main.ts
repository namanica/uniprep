import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from '@common/filters';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalFilters = new AllExceptionsFilter();
  app.useGlobalFilters(globalFilters);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT as string);
}
void bootstrap();

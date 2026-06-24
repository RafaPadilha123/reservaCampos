import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ID6 - Ativa a validação global de DTOs e rejeita propriedades indesejadas (whitelist)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove campos que não estão no DTO
      forbidNonWhitelisted: true, // Dá erro se enviarem campos não permitidos
      transform: true, // Transforma os tipos dos dados automaticamente
    }),
  );

  await app.listen(3000);
}
bootstrap();
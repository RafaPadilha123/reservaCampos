import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// Importaremos o interceptor e o filtro que vamos criar nos próximos passos:
// import { TransformInterceptor } from './common/interceptors/transform.interceptor';
// import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ID6: Blindagem de Entradas - rejeita o que não está no DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades que não estão no DTO
      forbidNonWhitelisted: true, // Retorna erro se enviarem dados não mapeados
      transform: true, // Transforma os tipos automaticamente
    }),
  );

  // Ative essas linhas assim que criarmos os arquivos do ID9 abaixo:
  // app.useGlobalInterceptors(new TransformInterceptor());
  // app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
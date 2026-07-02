import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // 🌟 Importa o Swagger
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
import { AllExceptionsFilter } from './http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ID6: Validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // ID9: Padronização de respostas e erros
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  // 🌟 ID12: CONFIGURAÇÃO DO SWAGGER
  const config = new DocumentBuilder()
    .setTitle('🏟️ Arena Campos API')
    .setDescription('Documentação interativa do sistema de reserva de quadras esportivas')
    .setVersion('1.0')
    .addBearerAuth() // Adiciona o campo de colocar o Token JWT lá no topo do Swagger
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Define que a rota será http://localhost:3000/api

  // 🌟 CONFIGURAÇÃO DO CORS ATUALIZADA PARA PRODUÇÃO
  app.enableCors({
    origin: '*', // Permite que qualquer origem (incluindo seu front no Render) acesse a API
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Garante que o NestJS use a porta fornecida pelo Render em produção ou a 3000 localmente
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0'); 
  console.log(`🚀 Aplicação rodando na porta: ${port}`);
}
bootstrap();
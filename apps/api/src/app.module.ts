import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module'; // Importa o submódulo
import { CamposModule } from './campos/campos.module';

@Module({
  imports: [
    AuthModule, // Garante que tudo o que está dentro de AuthModule seja carregado junto
    CamposModule,
  ],
  controllers: [AppController],
  providers: [AppService], // <-- REMOVA o AuthService e o PrismaService daqui se estiverem listados
})
export class AppModule {}
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CamposModule } from './campos/campos.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { ReservasModule } from './reservas/reservas.module';

@Module({
  imports: [
    PrismaModule, 
    CamposModule, 
    UsersModule, AuthModule, ReservasModule 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
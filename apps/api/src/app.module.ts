import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { PrismaService } from '../prisma/prisma.service';
import { CamposModule } from './campos/campos.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/user.module';
import { ReservasModule } from './reservas/reservas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    CamposModule,
    AuthModule,
    UsersModule,
    ReservasModule,
  ],
  providers: [PrismaService], 
  exports: [PrismaService],
})
export class AppModule {}
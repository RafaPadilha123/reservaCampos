import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule, // 🌟 2. Adicione o PrismaModule aqui dentro!
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'CHAVE_SECRETA_SUPER_SECRETA_123',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
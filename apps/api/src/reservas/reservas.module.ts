import { Module } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';
import { PrismaModule } from '../../prisma/prisma.module'; // 🌟 Importando o módulo do Prisma

@Module({
  imports: [PrismaModule], // 🌟 Adicionado o PrismaModule aqui dentro
  controllers: [ReservasController],
  providers: [ReservasService],
})
export class ReservasModule {}
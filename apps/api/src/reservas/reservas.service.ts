import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ReservasService {
  constructor(private prisma: PrismaService) {}

  async create(data: { userId: number; campoId: number; dataHora: string }) {
    return this.prisma.reserva.create({
      data: {
        userId: data.userId,
        campoId: data.campoId,
        data_hora: new Date(data.dataHora),
      },
    });
  }

  async findAll() {
    return this.prisma.reserva.findMany({
      include: { user: true, campo: true }, // Traz os dados do usuário e do campo juntos
    });
  }
}
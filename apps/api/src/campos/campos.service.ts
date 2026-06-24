import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCampoDto } from './campos.dto';

@Injectable()
export class CamposService {
  constructor(private prisma: PrismaService) {}

  // Salva o campo no banco Neon
  async create(dto: CreateCampoDto) {
    return this.prisma.campo.create({
      data: dto,
    });
  }

  // Lista todos os campos cadastrados
  async findAll() {
    return this.prisma.campo.findMany();
  }
}
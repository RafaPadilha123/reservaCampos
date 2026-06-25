import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CamposService {
  constructor(private prisma: PrismaService) {}

  // ➕ Criar um novo campo/quadra
  async create(data: { nome: string; tipo_grama: string; preco_hora: number }) {
    return this.prisma.campo.create({
      data: {
        nome: data.nome,
        tipo_grama: data.tipo_grama,
        preco_hora: data.preco_hora,
      },
    });
  }

  // 🔍 Buscar todos os campos do banco
  async findAll() {
    return this.prisma.campo.findMany();
  }

  // 🔍 Buscar um único campo por ID
  async findOne(id: number) {
    const campo = await this.prisma.campo.findUnique({ where: { id } });
    if (!campo) throw new NotFoundException('Campo não encontrado.');
    return campo;
  }

  // 📝 Atualizar um campo existente
  async update(id: number, data: { nome?: string; tipo_grama?: string; preco_hora?: number }) {
    await this.findOne(id); // Garante que o campo existe
    return this.prisma.campo.update({
      where: { id },
      data,
    });
  }

  // ❌ Deletar um campo
  async remove(id: number) {
    await this.findOne(id); // Garante que o campo existe
    return this.prisma.campo.delete({ where: { id } });
  }
}
import { PrismaService } from '../../prisma/prisma.service';
export declare class CamposService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        nome: string;
        tipo_grama: string;
        preco_hora: number;
    }): Promise<{
        id: number;
        nome: string;
        tipo_grama: string;
        preco_hora: number;
    }>;
    findAll(): Promise<{
        id: number;
        nome: string;
        tipo_grama: string;
        preco_hora: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        nome: string;
        tipo_grama: string;
        preco_hora: number;
    }>;
    update(id: number, data: {
        nome?: string;
        tipo_grama?: string;
        preco_hora?: number;
    }): Promise<{
        id: number;
        nome: string;
        tipo_grama: string;
        preco_hora: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        nome: string;
        tipo_grama: string;
        preco_hora: number;
    }>;
}

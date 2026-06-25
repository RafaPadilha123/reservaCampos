import { PrismaService } from '../../prisma/prisma.service';
export declare class CamposService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        nome: string;
        tipo_grama: string;
        preco_hora: number;
    }): Promise<{
        nome: string;
        tipo_grama: string;
        preco_hora: number;
        id: number;
    }>;
    findAll(): Promise<{
        nome: string;
        tipo_grama: string;
        preco_hora: number;
        id: number;
    }[]>;
    findOne(id: number): Promise<{
        nome: string;
        tipo_grama: string;
        preco_hora: number;
        id: number;
    }>;
    update(id: number, data: {
        nome?: string;
        tipo_grama?: string;
        preco_hora?: number;
    }): Promise<{
        nome: string;
        tipo_grama: string;
        preco_hora: number;
        id: number;
    }>;
    remove(id: number): Promise<{
        nome: string;
        tipo_grama: string;
        preco_hora: number;
        id: number;
    }>;
}

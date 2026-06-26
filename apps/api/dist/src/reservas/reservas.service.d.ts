import { PrismaService } from '../../prisma/prisma.service';
export declare class ReservasService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        userId: number;
        campoId: number;
        dataHora: string;
    }): Promise<{
        id: number;
        data_hora: Date;
        campoId: number;
        userId: number;
    }>;
    findAll(): Promise<({
        user: {
            id: number;
            email: string;
            name: string;
            password: string;
            role: string;
        };
        campo: {
            id: number;
            nome: string;
            tipo_grama: string;
            preco_hora: number;
        };
    } & {
        id: number;
        data_hora: Date;
        campoId: number;
        userId: number;
    })[]>;
}

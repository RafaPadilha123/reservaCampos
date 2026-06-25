import { PrismaService } from '../prisma.service';
import { CreateCampoDto } from './campos.dto';
export declare class CamposService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateCampoDto): Promise<{
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
}

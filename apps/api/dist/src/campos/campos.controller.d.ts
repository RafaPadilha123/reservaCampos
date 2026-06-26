import { CamposService } from './campos.service';
export declare class CamposController {
    private readonly camposService;
    constructor(camposService: CamposService);
    create(createCampoDto: {
        nome: string;
        tipo_grama: string;
        preco_hora: number;
    }, role: string): Promise<{
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
    findOne(id: string): Promise<{
        id: number;
        nome: string;
        tipo_grama: string;
        preco_hora: number;
    }>;
    update(id: string, updateCampoDto: {
        nome?: string;
        tipo_grama?: string;
        preco_hora?: number;
    }): Promise<{
        id: number;
        nome: string;
        tipo_grama: string;
        preco_hora: number;
    }>;
    remove(id: string): Promise<{
        id: number;
        nome: string;
        tipo_grama: string;
        preco_hora: number;
    }>;
}

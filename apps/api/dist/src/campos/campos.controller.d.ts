import { CamposService } from './campos.service';
export declare class CamposController {
    private readonly camposService;
    constructor(camposService: CamposService);
    create(createCampoDto: {
        nome: string;
        tipo_grama: string;
        preco_hora: number;
    }, role: string): Promise<{
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
    findOne(id: string): Promise<{
        nome: string;
        tipo_grama: string;
        preco_hora: number;
        id: number;
    }>;
    update(id: string, updateCampoDto: {
        nome?: string;
        tipo_grama?: string;
        preco_hora?: number;
    }): Promise<{
        nome: string;
        tipo_grama: string;
        preco_hora: number;
        id: number;
    }>;
    remove(id: string): Promise<{
        nome: string;
        tipo_grama: string;
        preco_hora: number;
        id: number;
    }>;
}

import { ReservasService } from './reservas.service';
export declare class ReservasController {
    private readonly reservasService;
    constructor(reservasService: ReservasService);
    create(createDto: {
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

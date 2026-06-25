import { ReservasService } from './reservas.service';
export declare class ReservasController {
    private readonly reservasService;
    constructor(reservasService: ReservasService);
    create(createDto: {
        userId: number;
        campoId: number;
        dataHora: string;
    }): Promise<{
        data_hora: Date;
        id: number;
        campoId: number;
        userId: number;
    }>;
    findAll(): Promise<({
        campo: {
            id: number;
            nome: string;
            tipo_grama: string;
            preco_hora: number;
        };
        user: {
            id: number;
            name: string;
            email: string;
            password: string;
            role: string;
        };
    } & {
        data_hora: Date;
        id: number;
        campoId: number;
        userId: number;
    })[]>;
}

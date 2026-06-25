import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        email: string;
        role: string;
    }[]>;
}

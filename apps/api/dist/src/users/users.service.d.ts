import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        id: number;
        email: string;
        name: string;
        password: string;
        role: string;
    }>;
    findAll(): Promise<{
        id: number;
        email: string;
        name: string;
        role: string;
    }[]>;
}

import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(data: any): Promise<{
        email: string;
        password: string;
        name: string;
        id: number;
        role: string;
    }>;
    login(data: any): Promise<{
        message: string;
        user: {
            email: string;
            password: string;
            name: string;
            id: number;
            role: string;
        };
        access_token: string;
    }>;
}

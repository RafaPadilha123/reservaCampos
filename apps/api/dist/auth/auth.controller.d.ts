import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: any): Promise<{
        email: string;
        password: string;
        name: string;
        id: number;
        role: string;
    }>;
    login(body: any): Promise<{
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

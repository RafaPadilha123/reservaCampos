import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        id: number;
        name: any;
        email: any;
        role: any;
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
}

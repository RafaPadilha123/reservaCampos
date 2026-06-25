export declare class AuthService {
    private users;
    register(dto: any): Promise<{
        id: number;
        name: any;
        email: any;
        role: any;
    }>;
    login(email: string, passwordInput: string): Promise<{
        access_token: string;
    }>;
}

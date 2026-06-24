import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  // Corrigido adicionando o tipo : any[] para o TypeScript aceitar os objetos
  private users: any[] = [];

  async register(dto: any) {
    const userExists = this.users.find(u => u.email === dto.email);
    if (userExists) {
      throw new BadRequestException('E-mail já cadastrado.');
    }

    const newUser = {
      id: this.users.length + 1,
      name: dto.name,
      email: dto.email,
      password: dto.password,
      role: dto.role || 'CLIENT',
    };

    this.users.push(newUser);

    const { password, ...result } = newUser;
    return result;
  }

  async login(email: string, passwordInput: string) {
    const user = this.users.find(u => u.email === email);
    
    if (!user || user.password !== passwordInput) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    return {
      access_token: `mock_jwt_token_for_user_${user.id}`,
    };
  }
}
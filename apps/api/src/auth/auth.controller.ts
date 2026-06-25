import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './auth.dto';

@Controller('auth') // Cria a rota http://localhost:3000/auth
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register') // Rota: POST /auth/register
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login') // Rota: POST /auth/login
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }
}
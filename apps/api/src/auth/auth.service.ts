import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    // 1. Busca o usuário pelo e-mail no banco
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    // 2. Se não achar o usuário, já barra aqui
    if (!user) {
      throw new UnauthorizedException('E-mail ou senha incorretos.');
    }

    // 3. Compara a senha digitada com a hash criptografada do banco
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('E-mail ou senha incorretos.');
    }

    // 4. Cria o Payload (dados guardados dentro do token)
    const payload = { sub: user.id, email: user.email };

    // 5. Retorna o Token JWT e os dados públicos do usuário
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
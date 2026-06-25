import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt'; // <-- Novo Import
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  // Injetamos também o JwtService no construtor
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async register(data: any) {
    const { email, password, name } = data;
    const userExists = await this.prisma.user.findUnique({ where: { email } });
    if (userExists) throw new BadRequestException('Este e-mail já está cadastrado.');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { email, name, password: hashedPassword },
    });

    delete (user as any).password;
    return user;
  }

  async login(data: any) {
    const { email, password } = data;
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Credenciais inválidas.');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Credenciais inválidas.');

    // Preparamos o que vai criptografado dentro do token (Payload)
    const payload = { sub: user.id, email: user.email, role: user.role };

    delete (user as any).password;
    return {
      message: 'Login bem-sucedido',
      user,
      // Geramos o token assinado aqui 🚀
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
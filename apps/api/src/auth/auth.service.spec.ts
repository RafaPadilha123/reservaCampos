import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService (TDD - Issue #1)', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let jwtService: JwtService;

  // Banco de dados em memória para simular o comportamento do Prisma nos testes
  const mockUsersDatabase: any[] = [];

  const mockPrismaService = {
    user: {
      findUnique: jest.fn().mockImplementation(({ where }) => {
        const user = mockUsersDatabase.find((u) => u.email === where.email);
        return user || null;
      }),
      create: jest.fn().mockImplementation(({ data }) => {
        const newUser = { id: mockUsersDatabase.length + 1, ...data, role: 'CLIENT' };
        mockUsersDatabase.push(newUser);
        return newUser;
      }),
    },
  };

  const mockJwtService = {
    signAsync: jest.fn().mockResolvedValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mockToken'),
  };

  beforeEach(async () => {
    // Limpa o banco em memória antes de cada teste executado
    mockUsersDatabase.length = 0;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('register (Cadastro de Usuários)', () => {
    it('deve cadastrar um novo usuário com sucesso (Caminho Feliz)', async () => {
      const dto = { email: 'novo@email.com', password: 'senha123', name: 'Rafa' };

      const result = await service.register(dto);

      expect(result).toBeDefined();
      expect(result.email).toBe(dto.email);
      expect(result.name).toBe(dto.name);
      expect(result).not.toHaveProperty('password'); // Garante a remoção da senha por segurança
    });

    it('deve lançar BadRequestException se o e-mail já estiver cadastrado (Exceção)', async () => {
      const dto = { email: 'duplicado@email.com', password: 'senha123', name: 'Rafa' };
      
      // Cadastra o primeiro usuário
      await service.register(dto);

      // Tenta cadastrar novamente com o mesmo e-mail
      await expect(service.register(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('login (Autenticação)', () => {
    it('deve autenticar um usuário válido e retornar um token (Caminho Feliz)', async () => {
      const passwordPlain = 'senha123';
      const hashedPassword = await bcrypt.hash(passwordPlain, 10);
      
      // Insere um usuário diretamente no banco em memória simulando dados persistidos
      mockUsersDatabase.push({
        id: 1,
        email: 'login@email.com',
        password: hashedPassword,
        name: 'Rafa',
        role: 'CLIENT',
      });

      const result = await service.login({ email: 'login@email.com', password: passwordPlain });

      expect(result).toHaveProperty('message', 'Login bem-sucedido');
      expect(result).toHaveProperty('access_token');
      expect(result.user.email).toBe('login@email.com');
      expect(result.user).not.toHaveProperty('password');
    });

    it('deve lançar UnauthorizedException se a senha estiver incorreta (Exceção)', async () => {
      const hashedPassword = await bcrypt.hash('senhaCorreta', 10);
      
      mockUsersDatabase.push({
        id: 1,
        email: 'login@email.com',
        password: hashedPassword,
        name: 'Rafa',
        role: 'CLIENT',
      });

      await expect(
        service.login({ email: 'login@email.com', password: 'senhaIncorreta' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
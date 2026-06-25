import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';

describe('AuthService (TDD - Issue #1)', () => {
  let service: AuthService;

  
  const mockUsersDatabase = [];

  const mockPrismaService = {
    user: {
      create: jest.fn().mockImplementation(({ data }) => {
        if (mockUsersDatabase.some(u => u.email === data.email)) {
          throw new Error('P2002'); // Erro de unicidade do Prisma
        }
        const newUser = { id: mockUsersDatabase.length + 1, ...data };
        mockUsersDatabase.push(newUser);
        return newUser;
      }),
      findUnique: jest.fn().mockImplementation(({ where }) => {
        return mockUsersDatabase.find(u => u.email === where.email) || null;
      }),
    },
  };

  beforeEach(async () => {
    // Limpa o banco simulado antes de cada teste
    mockUsersDatabase.length = 0;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: 'PrismaService', useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('register (Cadastro de Usuários)', () => {
    it('deve cadastrar um novo usuário com sucesso (Caminho Feliz)', async () => {
      const dto = { name: 'Rafa', email: 'rafa@teste.com', password: 'password123', role: 'CLIENT' };
      const result = await service.register(dto);

      expect(result).toHaveProperty('id');
      expect(result.email).toBe(dto.email);
      expect(result).not.toHaveProperty('password'); // Segurança: não retornar a senha!
    });

    it('deve lançar BadRequestException se o e-mail já estiver cadastrado (Exceção)', async () => {
      const dto = { name: 'Rafa', email: 'duplicado@teste.com', password: 'password123', role: 'CLIENT' };
    
      await service.register(dto);

      // Tenta cadastrar o segundo com o mesmo e-mail
      await expect(service.register(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('login (Autenticação)', () => {
    it('deve autenticar um usuário válido e retornar um token (Caminho Feliz)', async () => {
      const dto = { name: 'Rafa', email: 'login@teste.com', password: 'password123', role: 'CLIENT' };
      await service.register(dto);

      const result = await service.login('login@teste.com', 'password123');
      expect(result).toHaveProperty('access_token');
    });

    it('deve lançar UnauthorizedException se a senha estiver incorreta (Exceção)', async () => {
      const dto = { name: 'Rafa', email: 'senha_errada@teste.com', password: 'password123', role: 'CLIENT' };
      await service.register(dto);

      await expect(service.login('senha_errada@teste.com', 'errada')).rejects.toThrow(UnauthorizedException);
    });
  });
});
import { Test, TestingModule } from '@nestjs/testing';
import { CamposService } from './campos.service';
import { PrismaService } from '../../prisma/prisma.service';

const mockPrismaService = {
  campo: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
};

describe('CamposService', () => {
  let service: CamposService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CamposService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CamposService>(CamposService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  it('deve criar um campo com sucesso', async () => {
    const payload = { nome: 'Arena Central', tipo_grama: 'Sintética', preco_hora: 120 };
    mockPrismaService.campo.create.mockResolvedValue({ id: 1, ...payload });

    const result = await service.create(payload);
    
    expect(result).toHaveProperty('id');
    expect(result.nome).toBe('Arena Central');
  });

  it('deve repassar o erro caso o Prisma falhe', async () => {
    const payload = { nome: 'Arena Erro', tipo_grama: 'Natural', preco_hora: -50 };
    mockPrismaService.campo.create.mockRejectedValue(new Error('Erro de banco'));

    await expect(service.create(payload)).rejects.toThrow('Erro de banco');
  });
});
import { Test, TestingModule } from '@nestjs/testing';
import { CamposService } from './campos.service';
import { PrismaService } from '../prisma.service';

describe('CamposService (TDD)', () => {
  let service: CamposService;
  let prisma: PrismaService;

  // Mock do Prisma para não bater no Neon durante os testes unitários
  const mockPrismaService = {
    campo: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CamposService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<CamposService>(CamposService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  it('ID10/ID11: Deve criar um campo com sucesso (Caminho Feliz)', async () => {
    const dto = { nome: 'Campo Central', localizacao: 'Setor A' };
    const mockOutput = { id: 1, ...dto, userId: 1 };
    
    mockPrismaService.campo.create.mockResolvedValue(mockOutput);

    const result = await service.create(dto, 1);
    expect(result).toEqual(mockOutput);
    expect(prisma.campo.create).toHaveBeenCalled();
  });
});
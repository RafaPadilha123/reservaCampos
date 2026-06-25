import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Headers, // 🌟 Garanta que o Headers esteja aqui dentro!
  UnauthorizedException // 🌟 E a exceção também!
} from '@nestjs/common';
import { CamposService } from './campos.service';

@Controller('campos')
export class CamposController {
  constructor(private readonly camposService: CamposService) {}

  @Post()
  create(
    @Body() createCampoDto: { nome: string; tipo_grama: string; preco_hora: number },
    @Headers('x-user-role') role: string 
  ) {
    if (role !== 'ADMIN') {
      throw new UnauthorizedException('Apenas administradores podem cadastrar campos.');
    }
    return this.camposService.create(createCampoDto);
  }

  @Get()
  findAll() {
    return this.camposService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.camposService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCampoDto: { nome?: string; tipo_grama?: string; preco_hora?: number }) {
    return this.camposService.update(Number(id), updateCampoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.camposService.remove(Number(id));
  }
}
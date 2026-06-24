import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Ajusta o caminho se precisar

@Controller('campos')
export class CamposController {
  
  @Get()
  @UseGuards(JwtAuthGuard) // 🔒 Esta rota agora está trancada a sete chaves!
  findAll() {
    return { message: 'Se estás a ver isto, é porque o teu JWT funciona perfeitamente!' };
  }
}
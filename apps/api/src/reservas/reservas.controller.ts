import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common'; 
import { ReservasService } from './reservas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Post()
  @UseGuards(JwtAuthGuard) 
  create(@Body() createDto: { userId: number; campoId: number; dataHora: string }) {
    return this.reservasService.create(createDto);
  }

  @Get()
  findAll() {
    return this.reservasService.findAll();
  }
}
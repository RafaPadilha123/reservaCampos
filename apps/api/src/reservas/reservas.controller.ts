import { Controller, Get, Post, Body } from '@nestjs/common';
import { ReservasService } from './reservas.service';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Post()
  create(@Body() createDto: { userId: number; campoId: number; dataHora: string }) {
    return this.reservasService.create(createDto);
  }

  @Get()
  findAll() {
    return this.reservasService.findAll();
  }
}
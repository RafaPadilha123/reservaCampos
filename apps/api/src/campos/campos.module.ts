import { Module } from '@nestjs/common';
import { CamposService } from './campos.service';
import { CamposController } from './campos.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [CamposController],
  providers: [CamposService, PrismaService],
})
export class CamposModule {}
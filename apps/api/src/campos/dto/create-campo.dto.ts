import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateCampoDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome do campo é obrigatório.' })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'A localização do campo é obrigatória.' })
  localizacao: string;

  @IsNumber()
  @IsOptional()
  tamanho?: number;
}
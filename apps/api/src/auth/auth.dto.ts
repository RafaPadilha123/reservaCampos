import { IsEmail, IsString, MinLength, IsOptional, IsIn } from 'class-validator';

export class RegisterDto {
  @IsString({ message: 'O nome deve ser um texto.' })
  name: string;

  @IsEmail({}, { message: 'O e-mail informado deve ser válido.' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  password: string;

  @IsOptional()
  @IsIn(['CLIENT', 'ADMIN'], { message: 'O cargo deve ser CLIENT ou ADMIN.' })
  role?: string;
}

export class LoginDto {
  @IsEmail({}, { message: 'O e-mail informado deve ser válido.' })
  email: string;

  @IsString()
  password: string;
}
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsIn, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  department?: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsIn(['BASIC', 'ADM'])  // Validação para garantir que só esses valores sejam aceitos
  perfil: string;
}

import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  // Gera o token JWT com os dados do usuário
  refreshToken(user: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService, // JWT para autenticação com tokens
  ) {}

  // Função para registrar um novo usuário
  async register(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    return this.userService.createUser(createUserDto);
  }

  // Autenticar um usuário com email e senha
  async authenticate(email: string, password: string): Promise<Omit<User, 'password'>> {
    // Busca o usuário pelo email (exclui senha no retorno)
    const user = await this.userService.findByEmailForAuth(email);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Verifica se a senha é válida
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Remove a senha do retorno e retorna os dados do usuário
    const { password: _, ...result } = user;
    return result;
  }

  // Função para gerar JWT (usada no login)
  async login(user: Omit<User, 'password'>): Promise<{ accessToken: string }> {
    const payload = { sub: user.id, email: user.email, perfil: user.perfil };
    
    // Gera o token JWT com os dados do usuário
    const accessToken = this.jwtService.sign(payload);
    
    return { accessToken };
  }
}
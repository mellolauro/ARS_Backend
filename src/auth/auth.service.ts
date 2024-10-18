import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService, // Certifique-se de injetar o serviço correto
    private jwtService: JwtService,
  ) {}

  // Função para registrar um novo usuário
  async register(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    // Verifica se o usuário já existe
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Este e-mail já está registrado.');
    }

    // Criptografa a senha antes de salvar
    const hashedPassword = await hash(password, 10);

    // Cria o usuário no banco de dados com perfil padrão 'basic'
    const newUser = await this.userService.createUser({
      ...createUserDto,
      password: hashedPassword,  // Adiciona a senha criptografada
      perfil: 'basic',           // Define o perfil padrão como 'basic'
    });

    return newUser;
  }

  // Valida o usuário com email e senha
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmailForAuth(email);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const { password: _, ...result } = user;
    return result;
  }

  // Gera o token JWT para o usuário autenticado
  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Método para refresh token
  refreshToken(user: any) {
    throw new Error('Method not implemented.');
  }
}

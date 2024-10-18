import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { hash, compare } from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  create(dto: CreateUserDto) {
    throw new Error('Method not implemented.');
  }
  constructor(private prisma: PrismaService) {}

  // Método para encontrar o usuário por email para autenticação
  async findByEmailForAuth(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // Criar novo usuário
  async createUser(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { name, email, department, password } = createUserDto;

    // Verifica se o email já está em uso
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email já cadastrado');
    }

    const hashedPassword = await hash(password, 10);  // Criptografa a senha

    const newUser = await this.prisma.user.create({
      data: {
        name,
        email,
        department,
        password: hashedPassword,
        perfil: 'basic',  // Define o perfil automaticamente como 'basic'
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Remover a senha do retorno para segurança
    const { password: _, ...result } = newUser;
    return result;
  }

  // Autenticar um usuário com email e senha
  async authenticate(email: string, password: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

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

  // Buscar um usuário por email
  async findByEmail(email: string): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const { password: _, ...result } = user;
    return result;
  }

  // Buscar um usuário por ID
  async findById(id: number): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const { password: _, ...result } = user;
    return result;
  }

  // Atualizar um usuário
  async update(id: number, dto: UpdateUserDto): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        name: dto.name,
        email: dto.email,
        department: dto.department,
      },
    });

    const { password: _, ...result } = updatedUser;
    return result;
  }

  // Deletar um usuário
  async delete(id: number): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    await this.prisma.user.delete({
      where: { id },
    });
  }
}

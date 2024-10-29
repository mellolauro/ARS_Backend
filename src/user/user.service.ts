import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { hash } from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Método para criar um usuário
  async createUser(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { name, email, department, password } = createUserDto;

    // Verifica se o email já está registrado
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email já cadastrado');
    }

    // Criptografa a senha
    const hashedPassword = await hash(password, 10);

    // Cria o usuário com perfil BASIC
    const newUser = await this.prisma.user.create({
      data: {
        name,
        email,
        department,
        password: hashedPassword,
        perfil: 'BASIC', // Perfil padrão
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Remove a senha do retorno
    const { password: _, ...result } = newUser;
    return result;
  }

  // Método para encontrar um usuário por email (para autenticação)
  async findByEmailForAuth(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
      });
  }

  // Buscar um usuário por email (excluindo a senha)
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

  // Buscar um usuário por ID (excluindo a senha)
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

  // Atualizar dados do usuário
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
        updatedAt: new Date(), // Atualiza a data de modificação
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
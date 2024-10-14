import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { hash, compare } from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findByEmailForAuth(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
  
  // Criar um novo usuário
async create(dto: CreateUserDto): Promise<Omit<User, 'password'>> {
    // Verificar se o usuário já existe pelo email
    const user = await this.prisma.user.findUnique({
    where: { email: dto.email },
    });

    if (user) {
    throw new ConflictException('Email já está em uso');
    }

    // Criar novo usuário com a senha hashada
    const newUser = await this.prisma.user.create({
        data: {
        name: dto.name,
        email: dto.email,
        department: dto.department,
        password: await hash(dto.password, 10),
    },
    });

    // Remover a senha do retorno para segurança
    const { password, ...result } = newUser;
    return result;
}

  // Autenticar um usuário com email e senha
async authenticate(email: string, password: string): Promise<Omit<User, 'password'>> {
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

    const { password: userPassword, ...result } = user;
    return result;
}

  // Buscar um usuário por email
async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
    where: { email },
    });
}
  // Buscar um usuário por ID
async findById(id: number): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({
    where: { id },
    });

    if (!user) {
    throw new NotFoundException('Usuário não encontrado');
    }

    const { password, ...result } = user;
    return result;
}

  // Atualizar um usuário
async update(id: number, dto: UpdateUserDto): Promise<Omit<User, 'password'>> {
    // Verificar se o usuário existe
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

    const { password, ...result } = updatedUser;
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

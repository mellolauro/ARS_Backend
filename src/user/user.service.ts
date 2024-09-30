import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
        data: createUserDto,
    });
    }

    async findUserEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
        where: { email },
    });
    }

    async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
    }


    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
        where: { id },
        data: updateUserDto, 
    });
    }

    async delete(id: number): Promise<void> {
    await this.prisma.user.delete({
        where: { id },
    });
    }
}
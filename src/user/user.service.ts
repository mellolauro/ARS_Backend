import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateUserDto) {
      const user = await this.prisma.user.create({
            data
        });
        return user;
    }

    async findAll() {
        return this.prisma.user.findMany();
    }

    async update(id: number, data:CreateUserDto) {
        const UserExists = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!UserExists) {
            throw new Error('User does not exists!');
        }

        return await this.prisma.user.update({
            data,
            where: {
                id,
            },
        });
    }

    async delete(id: number) {
        const UserExists = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });

        if (!UserExists) {
            throw new Error('User does not exists!');
        }

        return await this.prisma.user.delete({
            where: {
                id,
            },
        });
    }
}

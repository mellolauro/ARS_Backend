import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateStatusDTO } from './dto/CreateStatus.dto';

@Injectable()
export class StatusService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateStatusDTO ) {
        const status = await this.prisma.status.create({
            data,
        });
        return status;
    }

    async findAll() {
        return this.prisma.status.findMany();
    }

    async update(id: number, data:CreateStatusDTO) {
        const StatusExists = await this.prisma.status.findUnique({
            where: {
                id,
            },
        });
        if (!StatusExists) {
            throw new Error('Status does not exists!');
        }
        return await this.prisma.status.update({
            data,
            where: {
                id,
            },
        });
    }

    async delete(id: number) {
        const StatusExists = await this.prisma.status.findUnique({
            where: {
                id,
            },
        });
        if(StatusExists) {
            throw new Error('Status does not exists!');
        }
        return await this.prisma.status.delete({
            where: {
                id,
            },
        });
    }
}
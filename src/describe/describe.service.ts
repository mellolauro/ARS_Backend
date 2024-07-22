import { Injectable } from '@nestjs/common';
import { CreateDescribeDTO } from './dto/Create-describe.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class DescribeService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateDescribeDTO) {
        const describe = await this.prisma.describe.create({
            data,
        });
        return describe;
    }

    async findAll(){
        return this.prisma.describe.findMany();
    }

    async update(id: number, data:CreateDescribeDTO) {
        const DescribeExists = await this.prisma.describe.findUnique({
            where: {
                id,
            },
        });
        if(!DescribeExists) {
            throw new Error('Describe does not exists!');
        }
        return await this.prisma.describe.update({
            data,
            where: {
                id,
            },
        });
    }
    async delete(id:number) {
        const DescribeExists = await this.prisma.describe.findUnique({
            where: {
                id,
            },
        });
        if (!DescribeExists) {
            throw new Error('Describe does not exists!');
        }
        return await this.prisma.describe.delete({
            where: {
                id,
            },
        });
    }
}
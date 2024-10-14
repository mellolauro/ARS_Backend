import { Module } from '@nestjs/common';
import { PrismaService } from './PrismaService'; // Caminho para o PrismaService

@Module({
providers: [PrismaService],
exports: [PrismaService],  
})
export class PrismaModule {}

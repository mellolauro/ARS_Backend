import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { PrismaService } from 'src/database/PrismaService';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, // ou use sua chave diretamente
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [StatusController],
  providers: [StatusService, PrismaService],
})
export class StatusModule {}

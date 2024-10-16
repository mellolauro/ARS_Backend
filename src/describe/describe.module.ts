import { Module } from '@nestjs/common';
import { DescribeService } from './describe.service';
import { DescribeController } from './describe.controller';
import { PrismaService } from 'src/database/PrismaService';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, // ou use sua chave diretamente
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [DescribeController],
  providers: [DescribeService, PrismaService],
})
export class DescribeModule {}

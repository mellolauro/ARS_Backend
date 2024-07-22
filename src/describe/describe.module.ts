import { Module } from '@nestjs/common';
import { DescribeService } from './describe.service';
import { DescribeController } from './describe.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [DescribeController],
  providers: [DescribeService, PrismaService],
})
export class DescribeModule {}

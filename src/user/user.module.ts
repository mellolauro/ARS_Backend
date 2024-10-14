import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaModule } from 'src/database/PrismaModule';

@Module({
  imports: [PrismaModule],
  providers: [UserService, PrismaService, JwtService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}

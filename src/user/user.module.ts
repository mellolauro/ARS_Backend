import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from '../database/PrismaModule'; // Importando o módulo que contém o PrismaService

@Module({
  imports: [PrismaModule],  // Certifique-se de importar o PrismaModule
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}


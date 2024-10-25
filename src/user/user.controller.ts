import { Body, Controller, Delete, Get, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiParam } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Recuperar o perfil do usuário logado
  @UseGuards(JwtGuard)  // Proteger rota com autenticação JWT
  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'ID do usuário' })
  async getUserProfile(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findById(id);
  }

  // Atualizar dados do usuário (protegido por JWT)
  @UseGuards(JwtGuard)
  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return await this.userService.update(id, updateUserDto);
  }

  // Excluir usuário (protegido por JWT)
  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.userService.delete(id);
    return { message: 'Usuário excluído com sucesso' };
  }
}

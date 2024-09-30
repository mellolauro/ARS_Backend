import { Body, Controller, Delete, Get, Param, Post, Put, Query, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User  } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('find')
  async getUser(@Query('email') email: string): Promise<User | null> {
    return this.userService.findUserEmail(email);
  }

  @Post('create')
  createUser(@Body() CreateUserDto: CreateUserDto) {
    return this.userService.create(CreateUserDto);
  }
  
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id:number,
    @Body() data: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, data);
  }
  


  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.userService.delete(id);
    return { message: `Usuário com ID ${id} deletado com sucesso.` };
  }
}

import { BadRequestException, Body, Controller, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { RefreshJwtGuard } from '../auth/guards/refresh.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('auth')  
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    console.log('Dados recebidos:', createUserDto);
    try {
      const user = await this.authService.register(createUserDto);
      return { message: 'Usuário registrado com sucesso', user };
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      throw new BadRequestException('Erro ao registrar o usuário');
    }
  }

  @Post('login')
async login(@Body() loginDto: LoginDto) {
  try {
    const user = await this.authService.authenticate(loginDto.email, loginDto.password);
    return await this.authService.login(user);
  } catch (error) {
    console.error('Erro no login:', error);
    throw new UnauthorizedException('Credenciais inválidas');
  }
}

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    console.log('Token atualizado');
    return await this.authService.refreshToken(req.user);
  }
}
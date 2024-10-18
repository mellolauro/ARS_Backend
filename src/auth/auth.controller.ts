import { BadRequestException, Body, Controller, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from '../auth/guards/refresh.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('user')
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private readonly authService: AuthService,
  ) {}

@Post('register')
async register(@Body() createUserDto: CreateUserDto) {
  console.log('Dados recebidos:', createUserDto);
  try {
    const user = await this.authService.register(createUserDto);
    return { message: 'Usuário registrado com sucesso', user };
  } catch (error) {
    throw new BadRequestException('Erro ao registrar o usuário');
  }
}


  @Post('login')
    async login(@Body() loginDto: LoginDto) {
    try {
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas');
        }
        return await this.authService.login(user);
    } catch (error) {
        console.error('Error during login:', error);
        throw new UnauthorizedException('Erro no processo de login');
    }
}

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    console.log('refreshed');

    return await this.authService.refreshToken(req.user);
  }
}  
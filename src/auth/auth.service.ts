import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

const EXPIRE_TIME = 20 * 1000;

@Injectable()
export class AuthService {
    refreshToken(user: any) {
    throw new Error('Method not implemented.');
}
    constructor(
    private userService: UserService,
    private jwtService: JwtService,
) {}

async validateUser(loginDto: LoginDto) {
    const user = await this.userService.findByEmailForAuth(loginDto.email);
    if (!user) {
        return null;
    }

    const isPasswordValid = await compare(loginDto.password, user.password);
        if (isPasswordValid) {
        return user;
    }
    return null;
}

async login(user: any) {
    const payload = { email: user.email, sub: user.id }; // Crie o payload com as informações do usuário
    return {
        access_token: this.jwtService.sign(payload), // Gera e retorna o token
    };

//async login(user: any) {
  //  const payload = { sub: user.id, email: user.email };
    //const accessToken = this.jwtService.sign(payload);
//    return {
  //  accessToken,
   // user: {
     //   id: user.id,
      //  name: user.name,
      //  email: user.email,
      //  department: user.department,
   // },
   // };
}
}
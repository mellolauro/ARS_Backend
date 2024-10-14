import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

const EXPIRE_TIME = 20 * 1000;

@Injectable()
export class AuthService {
    login(user: any) {
    throw new Error('Method not implemented.');
}
    refreshToken(user: any) {
    throw new Error('Method not implemented.');
}
constructor(
    private userService: UserService,
    private jwtService: JwtService,
) {}

async validateUser(loginDto: LoginDto) {
    console.log('Login attempt:', loginDto); 
    const user = await this.userService.findByEmailForAuth(loginDto.email);
    if (!user) {
    console.log('User not found');
    return null;
    }
    
    const isPasswordValid = await compare(loginDto.password, user.password);
    console.log('Password valid:', isPasswordValid);

    if (isPasswordValid) {
    return user;
    }
    return null; // Retorna null se a validação falhar
}
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthService {

constructor(private userService: UserService,
            private jwtService: JwtService
) {}

async validateUser(userEmail: string, userPassword: string) {
    const user = await this.userService.findUserEmail(userEmail);
    if (user && userPassword === userPassword) {
        const {...result} = user;
        return result;
    }
    return null;
    }

    async login(user: any) {
        const payload = {email: user.email, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload),            
        };
    }
}
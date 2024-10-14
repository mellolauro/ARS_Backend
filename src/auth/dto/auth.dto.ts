import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  [x: string]: any;
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

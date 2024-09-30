import { IsEmail, IsString, IsOptional } from "class-validator";

export class BaseUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    department: string;

    @IsOptional() 
    @IsString()
    password?: string;
}
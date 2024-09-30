import { IsString } from "class-validator";
import { BaseUserDto } from "./base-user.dto";

export class CreateUserDto extends BaseUserDto {
    @IsString()
    id: number;
}
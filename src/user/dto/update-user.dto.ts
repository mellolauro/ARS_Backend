import { IsOptional } from "class-validator";
import { BaseUserDto } from "./base-user.dto";

export class UpdateUserDto extends BaseUserDto {
    @IsOptional()
    id?: number;
}
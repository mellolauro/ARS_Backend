import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

    export class CreateUserDto  {
        @ApiProperty({
            description:'Nome da unidade',
            minimum: 1,
            default: 1,
        })
        
        @IsNotEmpty({message: 'O nome não pode ser vazio.'})
        @IsString({message: 'O nome não pode ser vazio.'})
        id: number;
        name:string;
        email: string;
        department: string;
        phone:string;
        createdAt: Date;
        updatedAt: Date;
};
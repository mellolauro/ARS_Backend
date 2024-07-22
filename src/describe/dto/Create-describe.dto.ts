import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateDescribeDTO  {
    @ApiProperty({
        description:'Nome da unidade',
        minimum: 1,
        default: 1,
    })
    @IsNotEmpty({message: 'O documento não pode ser vazio.'})
    @IsString({message: 'Subject não pode ser vazio.'})
    id: number;
    subject:string;
    document: string;
    openingDate: Date;
    createdAt: Date;
    updatedAt: Date;
};
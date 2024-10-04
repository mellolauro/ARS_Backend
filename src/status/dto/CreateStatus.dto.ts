import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStatusDTO {
  @ApiProperty({
    description: 'Nome da Unidade',
    minimum: 1,
    default: 1,
  })
  @IsNotEmpty({ message: 'Priority não pode ser vazio.' })
  @IsString({ message: 'Request não pode ser vazio' })
  id: number;
  priority: string;
  request: string;
  createdAt: Date;
  updatedAt: Date;
}

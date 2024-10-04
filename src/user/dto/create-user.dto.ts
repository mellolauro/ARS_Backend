import { BaseUserDto } from './base-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto extends BaseUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  department: string;

  @ApiProperty()
  password?: string;
}

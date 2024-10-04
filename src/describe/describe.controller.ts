import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DescribeService } from './describe.service';
import { CreateDescribeDTO } from './dto/Create-describe.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@ApiBearerAuth()
@ApiTags('Descrição')
@Controller('describe')
export class DescribeController {
  constructor(private readonly describeService: DescribeService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() data: CreateDescribeDTO) {
    return this.describeService.create(data);
  }

  @UseGuards(JwtGuard)
  @Get()
  async findAll() {
    return this.describeService.findAll();
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() data: CreateDescribeDTO) {
    return this.describeService.update(id, data);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.describeService.delete(id);
  }
}

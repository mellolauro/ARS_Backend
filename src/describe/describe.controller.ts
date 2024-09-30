import { Body, Controller, Delete, Param, Post, Put, Get, UseGuards } from '@nestjs/common';
import { DescribeService } from './describe.service';
import { CreateDescribeDTO } from './dto/Create-describe.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';

@ApiBearerAuth()
@Controller('describe')
export class DescribeController {
  constructor(private readonly describeService: DescribeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: CreateDescribeDTO){
    return this.describeService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(){
    return this.describeService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id:number, @Body() data:CreateDescribeDTO) {
    return this.describeService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id:number) {
    return this.describeService.delete(id);
  }
}
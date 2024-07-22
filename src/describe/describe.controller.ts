import { Body, Controller, Delete, Param, Post, Put, Get } from '@nestjs/common';
import { DescribeService } from './describe.service';
import { CreateDescribeDTO } from './dto/Create-describe.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('describe')
export class DescribeController {
  constructor(private readonly describeService: DescribeService) {}

  @Post()
  async create(@Body() data: CreateDescribeDTO){
    return this.describeService.create(data);
  }

  @Get()
  async findAll(){
    return this.describeService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id:number, @Body() data:CreateDescribeDTO) {
    return this.describeService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id:number) {
    return this.describeService.delete(id);
  }
}
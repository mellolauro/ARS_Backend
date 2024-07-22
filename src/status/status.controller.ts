import { Body, Controller, Delete, Get, Param, Post,Put } from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDTO } from './dto/CreateStatus.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post()
  async create(@Body() data:CreateStatusDTO) {
    return this.statusService.create(data);
  }

  @Get()
  async findAll() {
    return this.statusService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id:number, @Body() data:CreateStatusDTO){
    return this.statusService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id:number) {
    return this.statusService.delete(id);
  }
}

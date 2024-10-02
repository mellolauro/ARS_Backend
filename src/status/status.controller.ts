import { Body, Controller, Delete, Get, Param, Post,Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { StatusService } from './status.service';
import { CreateStatusDTO } from './dto/CreateStatus.dto';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';


@ApiBearerAuth()
@ApiTags('Status')
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data:CreateStatusDTO) {
    return this.statusService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.statusService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id:number, @Body() data:CreateStatusDTO){
    return this.statusService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id:number) {
    return this.statusService.delete(id);
  }
}

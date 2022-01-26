import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, BadRequestException, } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { TechnicalService } from './technical.service';
import { TechnicalDto } from './dto/create-technical.dto';
import { UpdateTechnicalDto } from './dto/update-technical.dto';
import { ServiceTechnicalService } from 'src/service-technical/service-technical.service';

@ApiTags('technical')
@Controller('technical')
export class TechnicalController {
  constructor(
    private readonly TechnicalService: TechnicalService,
    private readonly ServiceTechnical: ServiceTechnicalService
    ) {}

  @ApiResponse({ status: 200, description: "crea un tecnico nuevo", type: TechnicalDto})
  @Post()
  async create(@Body() TechnicalDto: TechnicalDto) {
    return await this.TechnicalService.create(TechnicalDto);
  }

  @ApiResponse({ status: 200, description: "retorna todos los tecnicos", type: TechnicalDto})
  @Get()
  async findAll() {
    return await this.TechnicalService.findAll();
  }

  @ApiResponse({ status: 200, description: "retorna un tecnico", type: TechnicalDto})
  @Get(':id')
  async findOne(@Param('id',ParseIntPipe) id: number) {
    return await this.TechnicalService.findOne(id);
  }

  @ApiResponse({ status: 200, description: "Modifica un tecnico", type: TechnicalDto})
  @Patch(':id')
  async update(@Param('id',ParseIntPipe) id: number, @Body() UpdateTechnicalDto: UpdateTechnicalDto) {
    return await this.TechnicalService.update(id, UpdateTechnicalDto);
  }

  @ApiResponse({ status: 200, description: "Elimina un tecnico"})
  @ApiResponse({ status: 400, description: "El tecnico ya esta eliminado", type: BadRequestException})
  @Delete(':id')
  async remove(@Param('id',ParseIntPipe) id: number) {
    return await this.TechnicalService.remove(id);
  }
  @Get('/ticket/:id')
  async findTicketsByTechnical(@Param('id',ParseIntPipe) id: number ) {
    return await this.ServiceTechnical.findAllTicketsByTechnical(id);
  }
}

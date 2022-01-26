import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, BadRequestException } from '@nestjs/common';
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
    const technical =  await this.TechnicalService.create(TechnicalDto);
    return {
      message: "Tecnico creado correctamente", 
      data: technical
    }
  }

  @ApiResponse({ status: 200, description: "retorna todos los tecnicos", type: TechnicalDto})
  @Get()
  async findAll() {
    const technicals =  await this.TechnicalService.findAll();
    
    return {
      message: "Tecnicos encontrados correctamente", 
      data: technicals
    }
  }

  @ApiResponse({ status: 200, description: "retorna un tecnico", type: TechnicalDto})
  @Get(':id')
  async findOne(@Param('id',ParseIntPipe) id: number) {
    const technical =  await this.TechnicalService.findOne(id);
    return {
      message: "Tecnico encontrado correctamente", 
      data: technical
    }
  }

  @ApiResponse({ status: 200, description: "Modifica un tecnico", type: TechnicalDto})
  @Patch(':id')
  async update(@Param('id',ParseIntPipe) id: number, @Body() UpdateTechnicalDto: UpdateTechnicalDto) {
    const technical = await this.TechnicalService.update(id, UpdateTechnicalDto);
    return {
      message: "Tecnico modificado correctamente", 
      data: technical
    };
  }

  @ApiResponse({ status: 200, description: "Elimina un tecnico"})
  @ApiResponse({ status: 400, description: "El tecnico ya esta eliminado", type: BadRequestException})
  @Delete(':id')
  async remove(@Param('id',ParseIntPipe) id: number) {
    const technical = await this.TechnicalService.remove(id)
    return {
      message: "Tecnico eliminado", 
      data: technical
    };
  }
  @Get('/ticket/:id')
  async findTicketsByTechnical(@Param('id',ParseIntPipe) id: number ) {
    const sercieTechnical = await this.ServiceTechnical.findAllTicketsByTechnical(id);
    return {
      message : "tickets encontrados",
      ticket : sercieTechnical
    };
  }
  @Patch('/ticket/:id')
  async solvedTicket(@Param('id',ParseIntPipe) id: number ) {
    const solvedTicket = await this.ServiceTechnical.solvedTicket(id);
    return {
      message : "ticket Solucionado", 
      data : solvedTicket
    }
  }
}

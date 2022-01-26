import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiTags,ApiOkResponse } from '@nestjs/swagger';

import { ServiceTechnicalService } from '@service-technical/service-technical.service';
import { TechnicalService } from './technical.service';
import { TechnicalDto } from './dto/create-technical.dto';
import { UpdateTechnicalDto } from './dto/update-technical.dto';

@ApiTags('technical')
@Controller('technical')
export class TechnicalController {
  constructor(
    private readonly TechnicalService: TechnicalService,
    private readonly ServiceTechnical: ServiceTechnicalService
    ) {}



  @ApiOkResponse({ description: "retorna todos los tecnicos"})
  @ApiNotFoundResponse({ description: "no hay tecnicos registrados"}) 
  @Get()
  async findAll() {
    const technicals =  await this.TechnicalService.findAll();
    
    return {
      message: "Tecnicos encontrados correctamente", 
      data: technicals
    }
  }

  @ApiOkResponse({ description: "retorna un tecnico", type: TechnicalDto})
  @ApiNotFoundResponse({ description: "Tecnico no encontrado"}) 
  @Get(':id')
  async findOne(@Param('id',ParseIntPipe) id: number) {
    const technical =  await this.TechnicalService.findOne(id);
    return {
      message: "Tecnico encontrado correctamente", 
      data: technical
    }
  }
  @ApiOkResponse({ description: "Lista todos los tickets del tecnico por fecha priorizando las mas antiguas"})
  @ApiNotFoundResponse({ description: "Tecnico no encontrado"}) 
  @Get('/ticket/:id')
  async findTicketsByTechnical(@Param('id',ParseIntPipe) id: number ) {
    const sercieTechnical = await this.ServiceTechnical.findAllTicketsByTechnical(id);
    return {
      message : "tickets encontrados",
      ticket : sercieTechnical
    };
  }

  @ApiOkResponse({ description: "crea un tecnico nuevo"})
  @ApiBadRequestResponse({ description: "faltan parametros o tipo incorrecto"})
  @Post()
  async create(@Body() TechnicalDto: TechnicalDto) {
    const technical =  await this.TechnicalService.create(TechnicalDto);
    return {
      message: "Tecnico creado correctamente", 
      data: technical
    }
  }
  @ApiOkResponse({ description: "Modifica un tecnico" })
  @ApiBadRequestResponse({ description: "faltan parametros o tipo incorrecto"})
  @ApiNotFoundResponse({ description: "Tecnico no encontrado"}) 
  
  @Patch(':id')
  async update(@Param('id',ParseIntPipe) id: number, @Body() UpdateTechnicalDto: UpdateTechnicalDto) {
    const technical = await this.TechnicalService.update(id, UpdateTechnicalDto);
    return {
      message: "Tecnico modificado correctamente", 
      data: technical
    };
  }

  @ApiOkResponse({ description: "Elimina un tecnico"})
  @ApiBadRequestResponse({ description: "El tecnico ya esta eliminado"})
  @Delete(':id')
  async remove(@Param('id',ParseIntPipe) id: number) {
    const technical = await this.TechnicalService.remove(id)
    return {
      message: "Tecnico eliminado", 
      data: technical
    };
  }

  @Patch('/ticket/:id')
  @ApiOkResponse({ description: "Resuelve un ticket"})
  @ApiNotFoundResponse({ description: "Ticket no encontrado"}) 
  async solvedTicket(@Param('id',ParseIntPipe) id: number ) {
    const solvedTicket = await this.ServiceTechnical.solvedTicket(id);
    return {
      message : "ticket Solucionado", 
      data : solvedTicket
    }
  }
}

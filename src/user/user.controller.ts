import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags,ApiNotFoundResponse, ApiBadRequestResponse,ApiOkResponse } from '@nestjs/swagger';

import { ServiceTechnicalService } from '@service-technical/service-technical.service';
import { ServiceTechnicalDto } from '@service-technical/dto/create-service-technical.dto';
import { UserService } from './user.service';
import { UserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly ServiceTechnical: ServiceTechnicalService,

    ) {}


  @ApiOkResponse({description: "retorna todos los usuarios"})
  @ApiBadRequestResponse({ description: "faltan parametros o tipo incorrecto"})
  @ApiNotFoundResponse({ description: "no hay usuarios registrados"})
  @Get()
  async findAll() {
    const users =  await this.userService.findAll();
    return {
      message: "Usuarios encontrados", 
      data: users
    }
  }

  @ApiOkResponse({description: "retorna un usuario"})
  @ApiNotFoundResponse({ description: "usuario no encontrado"})
  @Get(':id')
  async findOne(@Param('id',ParseIntPipe) id: number) {
    const user =  await this.userService.findOne(id);
    return {
      message: "Usuario encontrado", 
      data: user
    }
  }

  @ApiOkResponse({description: "crea un usuario nuevo"})
  @ApiBadRequestResponse({ description: "faltan parametros o tipo incorrecto"})
  @ApiNotFoundResponse({ description: "usuario no encontrado"})
  @Post()
  async create(@Body() UserDTO: UserDTO) {
      
    const user = await this.userService.create(UserDTO);
    return {
      message: "Usuario Creado correctamente", 
      data: user
    }
  }

  @ApiOkResponse({description: "Modifica un usuario" })
  @ApiBadRequestResponse({ description: "faltan parametros o tipo incorrecto"})
  @ApiNotFoundResponse({ description: "usuario no encontrado" })
  @Patch(':id')
  async update(@Param('id',ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(id, updateUserDto);
    return {
      message: "Usuario modificado correctamente", 
      data: user
    }
  }

  @ApiOkResponse({description: "Elimina un usuario"})
  @ApiNotFoundResponse({ description: "usuario no encontrado" })
  @Delete(':id')
  async remove(@Param('id',ParseIntPipe) id: number) {
    const user = await this.userService.remove(id);
    return {
      message: "Usuario Eliminado", 
      data: user
    }
  }

  @ApiOkResponse({description: "crea un ticket de servicio tecnico" })
  @ApiBadRequestResponse({ description: "faltan parametros o tipo incorrecto"})
  @ApiNotFoundResponse({ description: "usuario no encontrado" })
  @Post('/ticket')
  async createTicket(@Body() serviceTechnicalDto: ServiceTechnicalDto) {
    const ticket = await this.ServiceTechnical.create(serviceTechnicalDto)
    return {
      message: "ticket de servicio generado correctamente",
      data: {
        token: ticket.id,
        tecnico: ticket.technical.name + ' ' + ticket.technical.surname,
        fecha: ticket.start_date
      }
    };
  }

  @ApiOkResponse({description: "devuelve los datos del servicio tecnico" })
  @ApiBadRequestResponse({ description: "faltan parametros o tipo incorrecto" })
  @ApiNotFoundResponse({ description: "usuario no encontrado" })
  @Get('/ticket/:id')
  async getTicket(@Param('id',ParseIntPipe) id: number) {
    const ticket = await this.ServiceTechnical.findOne(id)
    return {
      message: "Ticket encontrado",
      data: ticket
    };
  }
}

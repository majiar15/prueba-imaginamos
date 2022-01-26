import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { UserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ServiceTechnicalService } from 'src/service-technical/service-technical.service';
import { ServiceTechnicalDto } from 'src/service-technical/dto/create-service-technical.dto';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly ServiceTechnical: ServiceTechnicalService,

    ) {}

  

  @ApiResponse({ status: 200, description: "retorna todos los usuarios", type: UserDTO})
  @Get()
  async findAll() {
    const users =  await this.userService.findAll();
    return {
      message: "Usuarios encontrados", 
      data: users
    }
  }

  @ApiResponse({ status: 200, description: "retorna un usuario", type: UserDTO})
  @Get(':id')
  async findOne(@Param('id',ParseIntPipe) id: number) {
    const user =  await this.userService.findOne(id);
    return {
      message: "Usuario encontrado", 
      data: user
    }
  }

  @ApiResponse({ status: 200, description: "crea un usuario nuevo", type: UserDTO})
  @Post()
  async create(@Body() UserDTO: UserDTO) {
      
    const user = await this.userService.create(UserDTO);
    return {
      message: "Usuario Creado correctamente", 
      data: user
    }
  }

  @ApiResponse({ status: 200, description: "Modifica un usuario", type: UserDTO})
  @Patch(':id')
  async update(@Param('id',ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(id, updateUserDto);
    return {
      message: "Usuario modificado correctamente", 
      data: user
    }
  }

  @ApiResponse({ status: 200, description: "Elimina un usuario"})
  @Delete(':id')
  async remove(@Param('id',ParseIntPipe) id: number) {
    const user = await this.userService.remove(id);
    return {
      message: "Usuario Eliminado", 
      data: user
    }
  }

  @ApiResponse({ status: 200, description: "crea un ticket de servicio tecnico", type: ServiceTechnicalDto})
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
}

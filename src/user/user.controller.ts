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
    return await this.userService.findAll();
  }

  @ApiResponse({ status: 200, description: "retorna un usuario", type: UserDTO})
  @Get(':id')
  async findOne(@Param('id',ParseIntPipe) id: number) {
    return await this.userService.findOne(id);
  }

  @ApiResponse({ status: 200, description: "crea un usuario nuevo", type: UserDTO})
  @Post()
  async create(@Body() UserDTO: UserDTO) {
    return await this.userService.create(UserDTO);
  }

  @ApiResponse({ status: 200, description: "Modifica un usuario", type: UserDTO})
  @Patch(':id')
  async update(@Param('id',ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @ApiResponse({ status: 200, description: "Elimina un usuario"})
  @Delete(':id')
  async remove(@Param('id',ParseIntPipe) id: number) {
    return await this.userService.remove(id);
  }

  @ApiResponse({ status: 200, description: "crea un ticket de servicio tecnico", type: ServiceTechnicalDto})
  @Post('/ticket')
  async createTicket(@Body() serviceTechnicalDto: ServiceTechnicalDto) {
    return await this.ServiceTechnical.create(serviceTechnicalDto);
  }
}

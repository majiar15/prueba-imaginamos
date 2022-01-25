import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Technical } from './entities/technical.entity';
import { TechnicalDto } from './dto/create-technical.dto';
import { UpdateTechnicalDto } from './dto/update-technical.dto';

@Injectable() 
export class TechnicalService {
  constructor(
    @InjectRepository(Technical) private TechnicalRepo: Repository<Technical>,
  ) {}
  async findAll() {
    const technical = await this.TechnicalRepo.find();
    console.log(technical);
    if(technical.length === 0) {
      throw new NotFoundException("no hay tecnicos") ;
    }
    return technical;
  }

  async findOne(id: number) {
    const technical = await this.TechnicalRepo.findOne(id);
    if(!technical){
      throw new NotFoundException("Tecnico no encontrado") ;
    }
    return technical;
  }

  create(body: any) {
    const newUser = new TechnicalDto();
    newUser.name = body.name;
    newUser.surname = body.surname;
    return this.TechnicalRepo.save(newUser);
  }

  async update(id: number, body: UpdateTechnicalDto) {
    const User = await this.TechnicalRepo.findOne(id);
    this.TechnicalRepo.merge(User, body);
    return this.TechnicalRepo.save(User);
  }
  async remove(id: number) {
    const query = await this.TechnicalRepo.delete(id);
    if(query.affected != 0){
      return "tecnico eliminado correctamente";
    }else{
      throw new BadRequestException("el Tecnico ya esta eliminado") ;
    }
  }
}

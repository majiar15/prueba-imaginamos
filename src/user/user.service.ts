import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashSync } from 'bcrypt';

import { UserDTO } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable() 
export class UserService {

  constructor(
    @InjectRepository(User) private UsersRepo: Repository<User>,
  ) {}
  async findAll() {
    const user = await this.UsersRepo.find();
    console.log(user);
    if(user.length === 0) {
      throw new NotFoundException("no hay usuarios registrados!") ;
    }
    return user;
  }

  async findOne(id: number) {
    const user = await this.UsersRepo.findOne(id);
    if(!user){
      throw new NotFoundException("Usuario no encontrado") ;
    }
    return user;
  }

  create(body: any) {
    const newUser = new UserDTO();
    newUser.name = body.name;
    newUser.surname = body.surname;
    newUser.password = hashSync(body.password,10);
    newUser.address = body.address;
    // const newUser = this.UsersRepo.create(body);
    return this.UsersRepo.save(newUser);
  }

  async update(id: number, body: UpdateUserDto) {
    const User = await this.UsersRepo.findOne(id);
    this.UsersRepo.merge(User, body);
    return this.UsersRepo.save(User);
  }
  async remove(id: number) {
    const query = await this.UsersRepo.delete(id);
    if(query.affected != 0){
      return "Usuario eliminado correctamente";
    }else{
      throw new BadRequestException("El usuario ya esta eliminado") ;
    }
  }
}

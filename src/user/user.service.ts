import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserDTO } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private UsersRepo: Repository<User>,
  ) {}
  findAll() {
    return this.UsersRepo.find();
  }

  findOne(id: number) {
    return this.UsersRepo.findOne(id);
  }

  create(body: any) {
    const newUser = new UserDTO();
    newUser.name = body.name;
    newUser.surname = body.surname;
    newUser.password = body.password;
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
    await this.UsersRepo.delete(id);
    return true;
  }
}

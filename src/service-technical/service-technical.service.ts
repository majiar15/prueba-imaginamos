import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@user/entities/user.entity';
import { Technical } from 'src/technical/entities/technical.entity';
import { Repository } from 'typeorm';
import { ServiceTechnicalDto } from './dto/create-service-technical.dto';
import { UpdateTechnicalDto } from './dto/update-service-technical.dto';

import { ServiceTechnical } from './entities/service-technical.entity';


@Injectable()
export class ServiceTechnicalService {


    constructor(
        @InjectRepository(ServiceTechnical) private serviceRepo: Repository<ServiceTechnical>,
        @InjectRepository(User) private UserRepo: Repository<User>,
        @InjectRepository(Technical) private TechnicalRepo: Repository<Technical>
      ) {}
      async findAllTicketsByTechnical(id:number,technical: Technical) {
        // const ticket = await this.serviceRepo.find({id: id, technical: technical } );
        const tickets = await this.serviceRepo.createQueryBuilder("ticket")
                                             .where(`ticket.id = true ${id} AND ticket.technical ${technical} AND status ='Pendiente'`)
                                             .orderBy("photo.start_date", "ASC")
                                             .getMany();

        console.log(tickets);
        if(tickets.length === 0) {
          throw new NotFoundException("no hay tickets de servicio tecnico!") ;
        }
        return tickets;
      }
    
      async findOne(id: number) {
        const ticket = await this.serviceRepo.findOne(id);
        if(!ticket){
          throw new NotFoundException("Ticket no encontrado") ;
        }
        return ticket;
      }
    
      async create(body: ServiceTechnicalDto) {
        const newTicket = new ServiceTechnicalDto();
        const user = await this.UserRepo.findOne(body.user);
        const technical = await this.TechnicalRepo.findOne(body.technical);
        if (!user) {
            throw new NotFoundException(`el usuario con id ${body.user} no existe`);
        }
        if (!technical) {
            throw new NotFoundException(`el tecnico con id ${body.technical} no existe`);
        }
        newTicket.user = user;
        newTicket.technical= technical;
        newTicket.note = body.note;
        newTicket.status = body.status;
        newTicket.start_date = body.start_date;
        
        // const newUser = this.serviceRepo.create(body);
        return this.serviceRepo.save(newTicket);
      }
    
      async update(id: number, body: UpdateTechnicalDto) {
        const Ticket = await this.serviceRepo.findOne(id);
        this.serviceRepo.merge(Ticket, body);
        return this.serviceRepo.save(Ticket);
      }
      async remove(id: number) {
        const query = await this.serviceRepo.delete(id);
        if(query.affected != 0){
          return "Ticket eliminado correctamente";
        }else{
          throw new BadRequestException("El Ticket ya esta eliminado") ;
        }
      }

}

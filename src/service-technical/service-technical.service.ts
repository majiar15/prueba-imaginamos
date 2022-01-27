import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user/entities/user.entity';
import { Technical } from '../technical/entities/technical.entity';
import { ServiceTechnicalDto } from './dto/create-service-technical.dto';
import { ServiceTechnical } from './entities/service-technical.entity';


@Injectable()
export class ServiceTechnicalService {


    constructor(
        @InjectRepository(ServiceTechnical) private serviceRepo: Repository<ServiceTechnical>,
        @InjectRepository(User) private UserRepo: Repository<User>,
        @InjectRepository(Technical) private TechnicalRepo: Repository<Technical>
      ) {}
     
    
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
        const technical =  await this.TechnicalRepo.createQueryBuilder('technical')
                                    .orderBy("RANDOM()")
                                    .getOne();
        if (!user) {
            throw new NotFoundException(`el usuario con id ${body.user} no existe`);
        }
        newTicket.user = user;
        newTicket.technical= technical;
        newTicket.note = body.note;
        newTicket.status = body.status;
        newTicket.start_date = body.start_date;
        
        // const newUser = this.serviceRepo.create(body);
        return this.serviceRepo.save(newTicket);
      }
    


      async findAllTicketsByTechnical(id:number) {
        const technical = await this.TechnicalRepo.findOne(id);
        if (!technical) {
            throw new NotFoundException(`el tecnico con id ${id} no existe`);
        }
        const tickets = await this.serviceRepo.createQueryBuilder('service_technical')
                                            .where('service_technical.technical = :tech', {tech: id})
                                            .andWhere("service_technical.status = 'Pendiente'")
                                            .leftJoin('service_technical.user', 'user')
                                            .addSelect([ 'user.name', 'user.surname', 'user.address'])
                                            .orderBy('start_date', 'ASC')
                                            .getMany();
        if(tickets.length === 0) {
          throw new NotFoundException("no hay tickets de servicio tecnico!") ;
        }
        return tickets;
      }
      async solvedTicket(id: number) {
        const Ticket = await this.serviceRepo.findOne(id);
        if(!Ticket){
            throw new NotFoundException(`no se encontro el ticket de servicio  con id ${id}`);
        }
        this.serviceRepo.merge(Ticket, {status: 'Solucionado', ending_date: new Date()});
        return this.serviceRepo.save(Ticket);
      }

}

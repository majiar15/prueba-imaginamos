import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../user/entities/user.entity';
import { Technical } from '../technical/entities/technical.entity';
import { ServiceTechnicalService } from './service-technical.service';
import { ServiceTechnical } from './entities/service-technical.entity';

@Module({
  imports: [ 
    User,
    Technical,
    TypeOrmModule.forFeature([ServiceTechnical,User, Technical])
  ],
  exports:[
    ServiceTechnicalService
  ],
  providers: [ServiceTechnicalService]
})
export class ServiceTechnicalModule {}

import { Module } from '@nestjs/common';
import { ServiceTechnicalService } from './service-technical.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceTechnical } from './entities/service-technical.entity';
import { User } from '@user/entities/user.entity';
import { Technical } from 'src/technical/entities/technical.entity';

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

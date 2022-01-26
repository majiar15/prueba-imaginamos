import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { ServiceTechnical } from 'src/service-technical/entities/service-technical.entity';
import { ServiceTechnicalModule } from 'src/service-technical/service-technical.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    ServiceTechnicalModule,
    TypeOrmModule.forFeature([User, ServiceTechnical])
  ]
})
export class UserModule {}

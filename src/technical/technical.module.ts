import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServiceTechnicalModule } from '@service-technical/service-technical.module';
import { TechnicalService } from './technical.service';
import { TechnicalController } from './technical.controller';
import { Technical } from './entities/technical.entity';

@Module({
  imports: [
    ServiceTechnicalModule,
    TypeOrmModule.forFeature([Technical])
  ],
  controllers: [TechnicalController],
  providers: [TechnicalService]
})
export class TechnicalModule {}

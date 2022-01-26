import { Module } from '@nestjs/common';
import { TechnicalService } from './technical.service';
import { TechnicalController } from './technical.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Technical } from './entities/technical.entity';
import { ServiceTechnicalModule } from 'src/service-technical/service-technical.module';

@Module({
  imports: [
    ServiceTechnicalModule,
    TypeOrmModule.forFeature([Technical])
  ],
  controllers: [TechnicalController],
  providers: [TechnicalService]
})
export class TechnicalModule {}

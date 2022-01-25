import { Module } from '@nestjs/common';
import { TechnicalService } from './technical.service';
import { TechnicalController } from './technical.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Technical } from './entities/technical.entity';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([Technical])
  ],
  controllers: [TechnicalController],
  providers: [TechnicalService]
})
export class TechnicalModule {}

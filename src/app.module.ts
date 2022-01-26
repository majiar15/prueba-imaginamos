import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TechnicalModule } from '@technical/technical.module';
import { UserModule } from '@user/user.module';
import { ServiceTechnicalModule } from '@service-technical/service-technical.module';


@Module({
  controllers: [],
  providers: [],
  imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: ['dist/**/**/*.entity{.ts,.js}'],
        synchronize: false,
        retryDelay: 3000,
        retryAttempts: 10
      }),
      UserModule,
      TechnicalModule,
      ServiceTechnicalModule],
})
export class AppModule {}

import { ApiProperty } from "@nestjs/swagger";
import { IsString,IsDate, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

import { User } from "@user/entities/user.entity";
import { Technical } from "src/technical/entities/technical.entity";
export class ServiceTechnicalDto {
    @ApiProperty()
    readonly id?: number;

    @ApiProperty()
    @IsNumber()
    user: User;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    technical: Technical;

    @ApiProperty()
    @IsString({
        message: 'note debe ser una cadena'
    })
    note: string;

    @ApiProperty()
    @IsString({
        message: 'status debe ser una cadena'
    })
    status: string;


    @Type(() => Date)
    @IsDate({
        message: 'start_date debe ser de tipo Date'
    })

    @ApiProperty()
    start_date: Date;

    @ApiProperty()
    @Type(() => Date)
    @IsDate({
        message: 'ending_date debe ser de tipo Date',
        
    })
    @IsOptional()
    ending_date: Date;

 
}
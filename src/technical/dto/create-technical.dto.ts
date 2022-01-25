import { ApiProperty } from "@nestjs/swagger";
import { IsString } from 'class-validator';
export class TechnicalDto {
    @ApiProperty()
    readonly id?: number;

    @IsString({
        message: 'name debe ser una cadena'
    })
    @ApiProperty()
    name: string;
    
    @IsString({
        message: 'surname debe ser una cadena'
    })
    @ApiProperty()
    surname: string;

 
}
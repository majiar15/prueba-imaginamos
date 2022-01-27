import { ApiProperty } from "@nestjs/swagger";
import { IsString } from 'class-validator';
export class TechnicalDto {
    @ApiProperty()
    readonly id?: number;

    @ApiProperty()
    @IsString({
        message: 'name debe ser una cadena'
    })
    name: string;
    
    @ApiProperty()
    @IsString({
        message: 'surname debe ser una cadena'
    })
    surname: string;

 
}
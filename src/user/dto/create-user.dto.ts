import { ApiProperty } from "@nestjs/swagger";
import { IsString } from 'class-validator';

export class UserDTO {
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

    @ApiProperty()
    @IsString({
        message: 'password debe ser una cadena'
    })
    password: string;

    @ApiProperty()
    @IsString({
        message: 'address debe ser una cadena'
    })
    address: string;

 
}

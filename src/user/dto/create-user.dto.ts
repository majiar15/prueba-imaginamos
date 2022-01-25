import { ApiProperty } from "@nestjs/swagger";
import { IsString } from 'class-validator';

export class UserDTO {
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

    @IsString({
        message: 'password debe ser una cadena'
    })
    @ApiProperty()
    password: string;

    @IsString({
        message: 'address debe ser una cadena'
    })
    @ApiProperty()
    address: string;

 
}

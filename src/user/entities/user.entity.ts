import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';


@Entity('user')
export class User{

    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({length:50})
    name:string;

    @Column({length:50})
    surname:string;

    @Column({length:255})
    password:string;

    @Column({length:100})
    address:string;

}
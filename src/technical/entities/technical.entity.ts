import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
@Entity('technical')
export class Technical {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({length:50})
    name:string;

    @Column({length:50})
    surname:string;
}
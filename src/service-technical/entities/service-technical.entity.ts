import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { Technical } from '../../technical/entities/technical.entity';



@Entity('service_technical')
export class ServiceTechnical {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @ManyToOne(() => User, user => user,{
        onDelete: "CASCADE"
    })
    @JoinColumn({name: 'user'})
    
    user:User;

    @ManyToOne(() => Technical, technical => technical,{
        onDelete: "CASCADE"
    })
    @JoinColumn({name: 'technical'})
    
    technical:Technical;

    @Column({length:255})
    note:string;

    @Column({length:100})
    status:string;

    @Column({ type: 'timestamptz' })
    start_date:Date;

    @Column({ type: 'timestamptz',nullable: true})
    ending_date:Date;
}
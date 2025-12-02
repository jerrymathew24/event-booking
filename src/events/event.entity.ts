import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Event {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column('timestamp with time zone')
    startAt: Date;

    @Column('timestamp with time zone')
    endAt: Date;

    @Column('int', { default: 0 })
    capacity: number;

    @Column('int', { default: 0 })
    seatsBooked: number;

    @CreateDateColumn()
    createdAt: Date;
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../../users/user.entity';
import { Event } from '../../events/event.entity';

@Entity()
export class Booking {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, { eager: true })
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Event, { eager: true })
    @JoinColumn({ name: 'eventId' })
    event: Event;

    @Column('int', { default: 1 })
    seats: number;

    @CreateDateColumn()
    createdAt: Date;
}

import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './entities/booking.entity';
import { EventsService } from '../events/events.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
    private eventsService: EventsService,
  ) { }

  async create(createBookingDto: CreateBookingDto, userId: string) {
    const event = await this.eventsService.findOne(createBookingDto.eventId);
    if (!event) throw new NotFoundException('Event not found');

    if (event.seatsBooked + createBookingDto.seats > event.capacity) {
      throw new BadRequestException('Not enough seats available');
    }

    // Update event seats
    await this.eventsService.update(event.id, {
      seatsBooked: event.seatsBooked + createBookingDto.seats,
    } as any);

    const booking = this.bookingsRepository.create({
      ...createBookingDto,
      user: { id: userId } as any,
      event: { id: createBookingDto.eventId } as any,
    });

    return this.bookingsRepository.save(booking);
  }

  findAll() {
    return this.bookingsRepository.find();
  }

  findOne(id: string) {
    return this.bookingsRepository.findOne({ where: { id } });
  }

  remove(id: string) {
    return this.bookingsRepository.delete(id);
  }
}

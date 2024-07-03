import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from '../prisma/prisma.service';
import { StatusEvents } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createEventDto: CreateEventDto, req) {
    const date = new Date(createEventDto.date);

    // Verifica se a data é inválida
    if (isNaN(date.getTime())) {
      throw new BadRequestException('Data inválida fornecida.');
    }
    const event = await this.prismaService.events.create({
      data: {
        ...createEventDto,
        status: StatusEvents.after,
        date,
        hostId: req.tokenPayload.id,
      },
    });

    return event;
  }

  async findAll() {
    const events = await this.prismaService.events.findMany();
    return events;
  }

  async findOne(id: string) {
    const event = await this.prismaService.events.findFirst({
      where: { id },
    });

    const guests = await this.prismaService.guests.findMany({
      where: {
        event_id: id,
      },
    });

    return { event, guests, count: guests.length };
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}

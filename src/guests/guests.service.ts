import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GuestsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createGuestDto: CreateGuestDto, req) {
    const userAlreadyExists = await this.prismaService.guests.findFirst({
      where: {
        id: req.tokenPayload.id,
      },
    });

    console.log(userAlreadyExists);

    if (userAlreadyExists) {
      throw new UnauthorizedException('Erro');
    }

    return await this.prismaService.guests.create({
      data: {
        ...createGuestDto,
        user_id: req.tokenPayload.id,
      },
    });
  }

  async findByEvent(event_id: string) {
    return await this.prismaService.guests.findMany({
      where: {
        event_id,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} guest`;
  }

  update(id: number, updateGuestDto: UpdateGuestDto) {
    return `This action updates a #${id} guest`;
  }

  remove(id: number) {
    return `This action removes a #${id} guest`;
  }
}

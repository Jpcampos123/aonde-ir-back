import { StatusGuests } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGuestDto {
  @IsNotEmpty()
  @IsString()
  status: StatusGuests;

  @IsNotEmpty()
  @IsString()
  event_id: string;
}

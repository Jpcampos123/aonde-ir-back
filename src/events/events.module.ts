import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { RoleGuard } from 'src/guards/role.guard';

@Module({
  imports: [AuthModule, PrismaModule, RoleGuard],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}

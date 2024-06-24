import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { EventsModule } from './events/events.module';
import { AuthGuard } from './guards/auth.guard';
import { PrismaModule } from './prisma/prisma.module';
import { RoleGuard } from './guards/role.guard';
import { GuestsModule } from './guests/guests.module';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp-relay.sendinblue.com',
        port: 587,
        auth: {
          user: 'jpcamposgda@hotmail.com',
          pass: 'P9kHXzEJQtDIpwVd',
        },
      },

      defaults: {
        from: '"Aonde ir" <jpcamposgda@hotmail.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    AuthModule,
    EventsModule,
    PrismaModule,
    GuestsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthGuard, RoleGuard],
})
export class AppModule {}

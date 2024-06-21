import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { EventsModule } from './events/events.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

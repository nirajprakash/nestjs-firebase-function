import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactController } from './contact/contact.controller';
import { MailerService } from './mailer/mailer.service';

@Module({
  imports: [],
  controllers: [AppController, ContactController],
  providers: [AppService, MailerService],
})
export class AppModule {}

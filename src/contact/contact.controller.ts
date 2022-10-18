import { Body, Controller, Post } from '@nestjs/common';
import { Contact } from 'src/entities/contact.entities';
import { MailerService } from 'src/mailer/mailer.service';

@Controller('contact')
export class ContactController {
  constructor(private mailerSerivce: MailerService) {}

  @Post()
  // @Post('create')
  async create(@Body() contact: Contact): Promise<any> {
    return await this.mailerSerivce.sendMessage(contact);
  }
}

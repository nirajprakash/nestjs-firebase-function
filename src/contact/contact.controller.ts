import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  ForbiddenException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map, Observable } from 'rxjs';
import { configuration } from 'src/config/configuration';
import { Contact } from 'src/entities/contact.entities';
import { MailerService } from 'src/mailer/mailer.service';

@Controller('contact')
export class ContactController {
  constructor(
    private mailerSerivce: MailerService,
    private readonly httpService: HttpService,
    private configService: ConfigService
  ) {}

  @Post()
  // @Post('create')
  async create(@Body() contact: Contact): Promise<any> {
    // https://www.google.com/recaptcha/api/siteverify
    const responseData = await lastValueFrom(
      this.httpService
        .post(
          'https://www.google.com/recaptcha/api/siteverify',
          null,

          {
            headers: {
              'Content-Type': 'application/json',
            },
            params: {
              secret: this.configService.get<string>("recaptchaSecret"),
              response: contact.token,
            },
          },
        )
        .pipe(
          map((response) => {
            return response.data;
          }),
        ),
    );
    if (responseData['success']) {
      const res = await this.mailerSerivce.sendMessage(contact);
      console.log('responseData', res);
      return res;
    } else {
      console.log(responseData);
      throw new ForbiddenException('You are not allowed to do that');
      // response.status(HttpStatus.FORBIDDEN).send('You are not allowed to do that');
    }
  }
}

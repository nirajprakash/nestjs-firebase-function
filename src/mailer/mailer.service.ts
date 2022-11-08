import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { topic } from 'firebase-functions/v1/pubsub';
import * as nodemailer from 'nodemailer';
import { TransportOptions } from 'nodemailer';
import { MailCredentialModel } from 'src/config/mailCredential.model';
import { EmailTemplateForm } from 'src/emails/templates';
import { Contact } from 'src/entities/contact.entities';


@Injectable()
export class MailerService {

  constructor(
    private configService: ConfigService
  ){

  }
  async sendMessage(contact: Contact): Promise<any> {
    // console.log("service account", serviceAccount)

    var credential = this.configService.get<MailCredentialModel>('mail');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: credential.type, //'OAuth2',
        user: credential.user,
        serviceClient: credential.serviceClient,
        privateKey: credential.privateKey,
      },
    } as TransportOptions);

    const serviceEmail = credential.to;

    const mailOptions = {
      from: credential.user,
      to: serviceEmail,
      subject: 'portfolio',
      html: EmailTemplateForm.submitted(contact.name, JSON.stringify(contact)),
    };

    // if(email !== "") {
    //    mailOptions["cc"] = email;
    // }

    // console.log("mailoptions ", mailOptions);

    const promise = new Promise((resolver, reject) => {
      transporter.sendMail(mailOptions, (erro, info) => {
        if (erro) {
          console.log('mail send error', erro);
          // throw erro;
          reject(erro);
          return;
        }

        console.log('mail send successfully');
        // return true; //res.status(200).json(mObject);
        resolver({ mailer: 'success' });
      });
    });

    return promise;
  }
}

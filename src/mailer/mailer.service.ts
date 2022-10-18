import { Injectable } from '@nestjs/common';
import { topic } from 'firebase-functions/v1/pubsub';
import * as nodemailer from 'nodemailer';
import { TransportOptions } from 'nodemailer';
import { EmailTemplateForm } from 'src/emails/templates';
import { Contact } from 'src/entities/contact.entities';

import ss = require('./../mail.json');

@Injectable()
export class MailerService {
  async sendMessage(contact: Contact) {
    // console.log("service account", serviceAccount)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: ss['type'], //'OAuth2',
        user: ss['user'],
        serviceClient: ss['serviceClient'], 
        privateKey: ss['privateKey'],
      },
    } as TransportOptions);



    const serviceEmail = ss['to'];

    const mailOptions = {
      from: ss['user'],
      to: serviceEmail,
      subject: 'portfolio',
      html: EmailTemplateForm.submitted(contact.name, JSON.stringify(contact)),
    };

    // if(email !== "") {
    //    mailOptions["cc"] = email;
    // }

    // console.log("mailoptions ", mailOptions);

    // let promise = new Promise((resolver, reject)=>{
    transporter.sendMail(mailOptions, (erro, info) => {
      if (erro) {
        console.log('mail send error', erro);
        throw erro;
        // reject (erro)
      }

      console.log('mail send successfully');
      return true; //res.status(200).json(mObject);
      // resolver({"mailer": "success"});
    });
  }
}

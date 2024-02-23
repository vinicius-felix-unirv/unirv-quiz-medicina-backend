import nodemailer from 'nodemailer';
import { MailDTO } from '../model/MailDTO';
import { Service } from 'typedi';
import * as emailValidator from 'email-validator';
import { BadRequestError } from '../exception/BadRequestError';

@Service()
export class SendEmailService{

    private transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT ? parseInt(process.env.MAIL_PORT) : 465,
        secure: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    sendMail(mail: MailDTO): void {

        if(!emailValidator.validate(mail.getTO())) throw new BadRequestError('Invalid email');

        this.transport.sendMail({
            from: process.env.MAIL_FROM,
            to: mail.getTO(),
            subject: mail.getSubject(),
            html: mail.getHtml(),
            text: mail.getText()
        }).then().catch(console.log);
    }
}





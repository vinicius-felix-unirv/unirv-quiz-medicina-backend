import nodemailer from 'nodemailer';
import { MailDTO } from '../model/MailDTO';
import { Service } from 'typedi';

@Service()
export class SendEmailService{

    private transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: false,
        auth: {
            user: 'devquizunirv@gmail.com',
            pass: 'lupfpdggauhebqfd'
        }
    });

    async sendMail(mail: MailDTO): Promise<void> {

        this.transport.sendMail({
            from: 'pedro.bittencourt.dev@gmail.com',
            to: mail.getTO(),
            subject: mail.getSubject(),
            html: mail.getHtml(),
            text: mail.getText()
        }).then(() => console.log('email enviado')).catch( (err) => { return new Error(err);});
    }
}





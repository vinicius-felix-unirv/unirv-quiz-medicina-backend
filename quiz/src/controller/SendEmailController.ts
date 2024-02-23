import { MailDTO } from '../model/MailDTO';
import { sendEmailService } from '../service/containerConfig';
import { Request, Response } from 'express';

export class SendEmailController{

    postSendEmail(req: Request, res: Response){

        const body = req.body;

        sendEmailService.sendMail(new MailDTO(body));

        return res.status(200).json({message: 'Email sent successfully'});
    }
}
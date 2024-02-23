import { Router } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { SendEmailController } from '../controller/SendEmailController';


const sendEmailRoutes = Router();
const sendEmailController = new SendEmailController();

sendEmailRoutes.post('/sendEmail', isAuthenticated, sendEmailController.postSendEmail);


export { sendEmailRoutes };
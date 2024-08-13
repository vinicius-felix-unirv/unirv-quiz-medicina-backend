import { Router } from 'express';
import { authorize } from '../middlewares/isAuthenticated';
import { SendEmailController } from '../controller/SendEmailController';


const sendEmailRoutes = Router();
const sendEmailController = new SendEmailController();

sendEmailRoutes.post('/send-email', authorize([1, 2, 3]), sendEmailController.postSendEmail);


export { sendEmailRoutes };
import { Router } from 'express';
import { AuthenticationController } from '../controller/AuthenticationController';

const authenticationRoutes = Router();
const authenticationController = new AuthenticationController();

authenticationRoutes.post('/authentication', authenticationController.createSession);

export { authenticationRoutes };

import { Router } from 'express';
import { authorize } from '../middlewares/isAuthenticated';
import { PerguntasNivelController } from '../controller/PerguntasNivelController';


const perguntasNivelRoutes = Router();
const perguntasNivelController = new PerguntasNivelController();


perguntasNivelRoutes.get('/niveis', authorize([1, 2, 3]), perguntasNivelController.getAllNivel);
perguntasNivelRoutes.get('/niveis/:id', authorize([1, 2, 3]), perguntasNivelController.getNivel);

export { perguntasNivelRoutes };
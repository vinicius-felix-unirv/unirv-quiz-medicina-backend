import { Router } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { PerguntasNivelController } from '../controller/PerguntasNivelController';


const perguntasNivelRoutes = Router();
const perguntasNivelController = new PerguntasNivelController();


perguntasNivelRoutes.get('/niveis', isAuthenticated, perguntasNivelController.getAllNivel);
perguntasNivelRoutes.get('/niveis/:id', isAuthenticated, perguntasNivelController.getNivel);

export { perguntasNivelRoutes };
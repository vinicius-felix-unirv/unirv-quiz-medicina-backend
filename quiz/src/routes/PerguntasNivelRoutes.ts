import { Router } from 'express';
// import { isAuthenticated } from '../middlewares/isAuthenticated';
import { PerguntasNivelController } from '../controller/PerguntasNivelController';


const perguntasNivelRoutes = Router();
const perguntasNivelController = new PerguntasNivelController();


perguntasNivelRoutes.get('/niveis',  perguntasNivelController.getAllNivel);
perguntasNivelRoutes.get('/niveis/:id',  perguntasNivelController.getNivel);

export { perguntasNivelRoutes };
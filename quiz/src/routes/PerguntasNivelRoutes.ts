import { Router } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { PerguntasNivelController } from '../controller/PerguntasNivelController';


const perguntasNivelRoutes = Router();
const perguntasNivelController = new PerguntasNivelController();

perguntasNivelRoutes.get('/niveis/:id', isAuthenticated, perguntasNivelController.getPerguntaNivelById);
perguntasNivelRoutes.get('/niveis', isAuthenticated, perguntasNivelController.getAllPerguntaNivel);
perguntasNivelRoutes.post('/niveis', isAuthenticated, perguntasNivelController.postPerguntasNivel);
perguntasNivelRoutes.put('/niveis/:id', isAuthenticated, perguntasNivelController.putPerguntasNivel);
perguntasNivelRoutes.delete('/niveis/:id', isAuthenticated, perguntasNivelController.deletePerguntasNivel);


export { perguntasNivelRoutes };
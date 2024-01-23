import { Router } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { PerguntasNivelController } from '../controller/PerguntasNivelController';


const perguntasNivelRoutes = Router();
const perguntasNivelController = new PerguntasNivelController();

perguntasNivelRoutes.get('/perguntasNivel/:id', isAuthenticated, perguntasNivelController.getPerguntaNivelById);
perguntasNivelRoutes.get('/perguntasNivel', isAuthenticated, perguntasNivelController.getAllPerguntaNivel);
perguntasNivelRoutes.post('/perguntasNivel', isAuthenticated, perguntasNivelController.postPerguntasNivel);
perguntasNivelRoutes.put('/perguntasNivel/:id', isAuthenticated, perguntasNivelController.putPerguntasNivel);
perguntasNivelRoutes.delete('/perguntasNivel/:id', isAuthenticated, perguntasNivelController.deletePerguntasNivel);


export { perguntasNivelRoutes };
import { Router } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { PerguntasNivelController } from '../controller/PerguntasNivelController';


const perguntasNivelRoutes = Router();
const perguntasNivelController = new PerguntasNivelController();

perguntasNivelRoutes.get('/perguntas-nivel/:id', isAuthenticated, perguntasNivelController.getPerguntaNivelById);
perguntasNivelRoutes.get('/perguntas-nivel', isAuthenticated, perguntasNivelController.getAllPerguntaNivel);
perguntasNivelRoutes.post('/perguntas-nivel', isAuthenticated, perguntasNivelController.postPerguntasNivel);
perguntasNivelRoutes.put('/perguntas-nivel/:id', isAuthenticated, perguntasNivelController.putPerguntasNivel);
perguntasNivelRoutes.delete('/perguntas-nivel/:id', isAuthenticated, perguntasNivelController.deletePerguntasNivel);


export { perguntasNivelRoutes };
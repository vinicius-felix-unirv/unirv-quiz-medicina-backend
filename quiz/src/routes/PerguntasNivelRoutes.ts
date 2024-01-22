import { Router } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { PerguntasNivelController } from '../controller/PerguntasNivelController';


const perguntasNivelRoutes = Router();
const perguntasNivelController = new PerguntasNivelController();

perguntasNivelRoutes.get('/perguntasNivel/:id', isAuthenticated, perguntasNivelController.getPerguntaNivelById);
// perguntasNivelRoutes.get('/perguntas', isAuthenticated, perguntasNivelController.getAllPergunta);
perguntasNivelRoutes.post('/perguntasNivel', isAuthenticated, perguntasNivelController.postPerguntasNivel);
// perguntasNivelRoutes.put('/perguntas/:id', isAuthenticated, perguntasNivelController.putPergunta);
// perguntasNivelRoutes.put('/perguntas/status/:id', isAuthenticated, perguntasNivelController.putStatusPergunta);

export { perguntasNivelRoutes };
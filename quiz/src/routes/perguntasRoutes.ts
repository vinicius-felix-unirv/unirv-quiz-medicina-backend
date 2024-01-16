import { Router } from 'express';
import { PerguntasController } from '../controller/PerguntasController';
import { isAuthenticated } from '../middlewares/isAuthenticated';


const perguntasRoutes = Router();
const perguntasController = new PerguntasController();

perguntasRoutes.get('/perguntas/:id', isAuthenticated, perguntasController.getPergunta);
perguntasRoutes.get('/perguntas', isAuthenticated, perguntasController.getAllPergunta);
perguntasRoutes.post('/perguntas', isAuthenticated, perguntasController.postPergunta);
perguntasRoutes.put('/perguntas/:id', isAuthenticated, perguntasController.putPergunta);
perguntasRoutes.put('/perguntas/status/:id', isAuthenticated, perguntasController.putStatusPergunta);

export { perguntasRoutes };
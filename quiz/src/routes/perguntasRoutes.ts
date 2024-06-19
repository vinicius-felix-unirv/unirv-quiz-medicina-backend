import { Router } from 'express';
import { PerguntasController } from '../controller/PerguntasController';
import { isAuthenticated } from '../middlewares/isAuthenticated';


const perguntasRoutes = Router();
const perguntasController = new PerguntasController();

perguntasRoutes.get('/perguntas/:id',  perguntasController.getPergunta);
perguntasRoutes.get('/usuarios/:usuariosid/quiz/:id/categorias/:categoriasid/perguntas/:take',  perguntasController.getAllPerguntasByQuizId);
perguntasRoutes.post('/perguntas', isAuthenticated, perguntasController.postPergunta);
perguntasRoutes.put('/perguntas/:id', isAuthenticated, perguntasController.putPergunta);
perguntasRoutes.put('/perguntas/:id/status', isAuthenticated, perguntasController.putStatusPergunta);

export { perguntasRoutes };
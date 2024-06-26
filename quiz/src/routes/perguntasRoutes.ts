import { Router } from 'express';
import { PerguntasController } from '../controller/PerguntasController';
// import { isAuthenticated } from '../middlewares/isAuthenticated';


const perguntasRoutes = Router();
const perguntasController = new PerguntasController();

perguntasRoutes.get('/perguntas/:id',  perguntasController.getPergunta);
perguntasRoutes.get('/usuarios/:usuariosid/quiz/:id/categorias/:categoriasid/perguntas/:skip/:take',  perguntasController.getAllPerguntasByQuizId);
perguntasRoutes.get('/quiz/:id/categorias/:categoriasid/perguntas/:skip/:take',  perguntasController.getAllPerguntasByQuizIdForProf);
perguntasRoutes.post('/perguntas', perguntasController.postPergunta);
perguntasRoutes.put('/perguntas/:id',  perguntasController.putPergunta);
perguntasRoutes.put('/perguntas/:id/status',  perguntasController.putStatusPergunta);

export { perguntasRoutes };
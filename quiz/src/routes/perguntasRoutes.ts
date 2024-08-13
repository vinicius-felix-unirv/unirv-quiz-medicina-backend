import { Router } from 'express';
import { PerguntasController } from '../controller/PerguntasController';
import { authorize } from '../middlewares/isAuthenticated';


const perguntasRoutes = Router();
const perguntasController = new PerguntasController();

perguntasRoutes.get('/perguntas/:id', authorize([1, 2, 3]), perguntasController.getPergunta);
perguntasRoutes.get('/usuarios/:usuariosid/quiz/:id/categorias/:categoriasid/perguntas/:skip/:take', authorize([1, 2, 3]), perguntasController.getAllPerguntasByQuizId);
perguntasRoutes.get('/quiz/:id/categorias/:categoriasid/perguntas/:skip/:take', authorize([1, 2 ]), perguntasController.getAllPerguntasByQuizIdForProf);
perguntasRoutes.post('/perguntas', authorize([1, 2 ]), perguntasController.postPergunta);
perguntasRoutes.put('/perguntas/:id', authorize([1, 2 ]), perguntasController.putPergunta);
perguntasRoutes.put('/perguntas/:id/status', authorize([1, 2 ]), perguntasController.putStatusPergunta);

export { perguntasRoutes };
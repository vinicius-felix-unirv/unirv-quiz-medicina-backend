import { Router } from 'express';

import { authorize } from '../middlewares/isAuthenticated';
import { ProgressoPerguntasController } from '../controller/ProgressoPerguntasController';


const progressoPerguntasRoutes = Router();
const progressoPerguntasController = new ProgressoPerguntasController();

progressoPerguntasRoutes.get('/usuarios/:usuarioid/quiz/:quizid/progresso-perguntas', authorize([1, 2, 3]),  progressoPerguntasController.getProgressoByQuiz);
progressoPerguntasRoutes.get('/usuarios/:usuarioid/quiz/:quizid/categorias/:categoriaid/progresso-perguntas', authorize([1, 2, 3]),  progressoPerguntasController.getProgressoByCategoria);
progressoPerguntasRoutes.post('/progresso-perguntas', authorize([1, 2, 3]),  progressoPerguntasController.postProgressoPerg);
progressoPerguntasRoutes.post('/progresso-perguntas/many', authorize([1, 2, 3]), progressoPerguntasController.postManyProgressoPerguntas);


export { progressoPerguntasRoutes };


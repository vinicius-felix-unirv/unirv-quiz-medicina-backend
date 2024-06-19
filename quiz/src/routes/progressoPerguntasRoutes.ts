import { Router } from 'express';

import { isAuthenticated } from '../middlewares/isAuthenticated';
import { ProgressoPerguntasController } from '../controller/ProgressoPerguntasController';


const progressoPerguntasRoutes = Router();
const progressoPerguntasController = new ProgressoPerguntasController();

progressoPerguntasRoutes.get('/usuarios/:usuarioid/quiz/:quizid/progresso-perguntas',   progressoPerguntasController.getProgressoByQuiz);
progressoPerguntasRoutes.get('/usuarios/:usuarioid/quiz/:quizid/categorias/:categoriaid/progresso-perguntas',   progressoPerguntasController.getProgressoByCategoria);
progressoPerguntasRoutes.post('/progresso-perguntas',   progressoPerguntasController.postProgressoPerg);
progressoPerguntasRoutes.post('/progresso-perguntas/many', isAuthenticated,  progressoPerguntasController.postManyProgressoPerguntas);


export { progressoPerguntasRoutes };


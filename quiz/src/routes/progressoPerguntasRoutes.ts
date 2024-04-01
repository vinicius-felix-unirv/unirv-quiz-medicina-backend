import { Router } from 'express';

import { isAuthenticated } from '../middlewares/isAuthenticated';
import { ProgressoPerguntasController } from '../controller/ProgressoPerguntasController';


const progressoPerguntasRoutes = Router();
const progressoPerguntasController = new ProgressoPerguntasController();

progressoPerguntasRoutes.get('/progresso-perguntas/:id', isAuthenticated, progressoPerguntasController.getAllProgressoPergByUsuario);
progressoPerguntasRoutes.post('/progresso-perguntas', isAuthenticated, progressoPerguntasController.postProgressoPerg);
progressoPerguntasRoutes.post('/progresso-perguntas/many', isAuthenticated, progressoPerguntasController.postManyProgressoPerguntas);


export { progressoPerguntasRoutes };


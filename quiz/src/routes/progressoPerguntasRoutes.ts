import { Router } from 'express';

import { isAuthenticated } from '../middlewares/isAuthenticated';
import { ProgressoPerguntasController } from '../controller/ProgressoPerguntasController';


const progressoPerguntasRoutes = Router();
const progressoPerguntasController = new ProgressoPerguntasController();

progressoPerguntasRoutes.get('/progressoPerguntas/:id', isAuthenticated, progressoPerguntasController.getAllProgressoPergByUsuario);
// progressoPerguntasRoutes.get('/perguntas', isAuthenticated, progressoPerguntasController.getAllPergunta);
progressoPerguntasRoutes.post('/progressoPerguntas', isAuthenticated, progressoPerguntasController.postProgressoPerg);
// progressoPerguntasRoutes.put('/perguntas/:id', isAuthenticated, progressoPerguntasController.putPergunta);
// progressoPerguntasRoutes.put('/perguntas/status/:id', isAuthenticated, progressoPerguntasController.putStatusPergunta);

export { progressoPerguntasRoutes };


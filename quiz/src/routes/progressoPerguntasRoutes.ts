import { Router } from 'express';

import { isAuthenticated } from '../middlewares/isAuthenticated';
import { ProgressoPerguntasController } from '../controller/ProgressoPerguntasController';


const progressoPerguntasRoutes = Router();
const progressoPerguntasController = new ProgressoPerguntasController();

progressoPerguntasRoutes.get('/progressoPerguntas/:id', isAuthenticated, progressoPerguntasController.getAllProgressoPergByUsuario);
progressoPerguntasRoutes.post('/progressoPerguntas', isAuthenticated, progressoPerguntasController.postProgressoPerg);


export { progressoPerguntasRoutes };


import { Router } from 'express';
import { PerguntasController } from '../controller/PerguntasController';


const perguntasRoutes = Router();
const perguntasController = new PerguntasController();

perguntasRoutes.post('/perguntas', perguntasController.postPergunta);

export {perguntasRoutes};
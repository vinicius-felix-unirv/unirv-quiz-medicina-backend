import { Router } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { QuizAvaliativoUsuarioController } from '../controller/QuizAvaliativoUsuarioController';


const quizAvaliativoUsuarioRoutes = Router();
const quizAvaliativoUsuarioController = new QuizAvaliativoUsuarioController();

quizAvaliativoUsuarioRoutes.post('/quiz-avaliativos-usuarios', isAuthenticated, quizAvaliativoUsuarioController.postScore);
quizAvaliativoUsuarioRoutes.get('/quiz-avaliativos-usuarios/:id', isAuthenticated, quizAvaliativoUsuarioController.getQuizScore);
quizAvaliativoUsuarioRoutes.get('/quiz-avaliativos-usuarios/:id/:skip/:take', isAuthenticated, quizAvaliativoUsuarioController.getAllQuizScore);

export { quizAvaliativoUsuarioRoutes };
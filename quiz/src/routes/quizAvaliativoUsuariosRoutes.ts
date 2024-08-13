import { Router } from 'express';
import { authorize } from '../middlewares/isAuthenticated';
import { QuizAvaliativoUsuarioController } from '../controller/QuizAvaliativoUsuarioController';


const quizAvaliativoUsuarioRoutes = Router();
const quizAvaliativoUsuarioController = new QuizAvaliativoUsuarioController();

quizAvaliativoUsuarioRoutes.post('/quiz-avaliativos-usuarios', authorize([1, 2, 3]), quizAvaliativoUsuarioController.postScore);
quizAvaliativoUsuarioRoutes.get('/quiz-avaliativos-usuarios/:id', authorize([1, 2, 3]), quizAvaliativoUsuarioController.getQuizScore);
quizAvaliativoUsuarioRoutes.get('/quiz-avaliativos-usuarios/:id/:skip/:take', authorize([1, 2, 3]), quizAvaliativoUsuarioController.getAllQuizScore);

export { quizAvaliativoUsuarioRoutes };
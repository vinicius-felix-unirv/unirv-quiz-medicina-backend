import { Router } from 'express';
// import { isAuthenticated } from '../middlewares/isAuthenticated';
import { QuizAvaliativoUsuarioController } from '../controller/QuizAvaliativoUsuarioController';


const quizAvaliativoUsuarioRoutes = Router();
const quizAvaliativoUsuarioController = new QuizAvaliativoUsuarioController();

quizAvaliativoUsuarioRoutes.post('/quiz-avaliativos-usuarios',  quizAvaliativoUsuarioController.postScore);
quizAvaliativoUsuarioRoutes.get('/quiz-avaliativos-usuarios/:id',  quizAvaliativoUsuarioController.getQuizScore);
quizAvaliativoUsuarioRoutes.get('/quiz-avaliativos-usuarios/:id/:skip/:take',  quizAvaliativoUsuarioController.getAllQuizScore);

export { quizAvaliativoUsuarioRoutes };
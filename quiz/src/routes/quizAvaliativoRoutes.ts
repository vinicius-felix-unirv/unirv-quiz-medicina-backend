import { Router } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { QuizAvaliativoController } from '../controller/QuizAvaliativoController';


const quizAvaliativoRoutes = Router();
const quizAvaliativoController = new QuizAvaliativoController();

quizAvaliativoRoutes.post('/quiz-avaliativos', isAuthenticated, quizAvaliativoController.postQuizAvaliativo);
quizAvaliativoRoutes.get('/quiz-avaliativos/:id', isAuthenticated, quizAvaliativoController.getQuizAvaliativo);
quizAvaliativoRoutes.get('/usuarios/:usuarioid/cursos/:cursoid/quiz-avaliativos/:skip/:take', isAuthenticated, quizAvaliativoController.getAllQuizAvaliativosByUsuarioAndCurso);
quizAvaliativoRoutes.get('/cursos/:cursoid/quiz-avaliativos/:skip/:take', isAuthenticated, quizAvaliativoController.getAllQuizAvaliativosByCurso);
quizAvaliativoRoutes.put('/quiz-avaliativos/:id', isAuthenticated, quizAvaliativoController.putQuizAvaliativo);
quizAvaliativoRoutes.put('/quiz-avaliativos/:id/status', isAuthenticated, quizAvaliativoController.putStatusQuizAvaliativo);

export { quizAvaliativoRoutes };
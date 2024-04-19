import { Router } from 'express';
// import { isAuthenticated } from '../middlewares/isAuthenticated';
import { QuizAvaliativoController } from '../controller/QuizAvaliativoController';


const quizAvaliativoRoutes = Router();
const quizAvaliativoController = new QuizAvaliativoController();

quizAvaliativoRoutes.post('/quiz-avaliativos', quizAvaliativoController.postQuizAvaliativo);
quizAvaliativoRoutes.get('/quiz-avaliativos/:id', quizAvaliativoController.getQuizAvaliativo);
quizAvaliativoRoutes.get('/usuarios/:usuarioid/cursos/:cursoid/quiz-avaliativos/:skip/:take', quizAvaliativoController.getAllQuizAvaliativosByUsuarioAndCurso);
quizAvaliativoRoutes.get('/cursos/:cursoid/quiz-avaliativos/:skip/:take', quizAvaliativoController.getAllQuizAvaliativosByCurso);
quizAvaliativoRoutes.put('/quiz-avaliativos/:id', quizAvaliativoController.putQuizAvaliativo);
quizAvaliativoRoutes.put('/quiz-avaliativos/:id/status', quizAvaliativoController.putStatusQuizAvaliativo);

export { quizAvaliativoRoutes };
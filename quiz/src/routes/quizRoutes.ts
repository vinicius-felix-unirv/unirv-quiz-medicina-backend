import { Router } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { QuizController } from '../controller/QuizController';


const quizRoutes = Router();
const quizController = new QuizController();
 
quizRoutes.post('/quiz', isAuthenticated, quizController.postQuiz);
quizRoutes.get('/quiz/:skip/:take', isAuthenticated, quizController.getAllquiz);
quizRoutes.get('/cursos/:id/quiz/:skip/:take', isAuthenticated, quizController.getAllquizByCursoId);
quizRoutes.get('/quiz/:id', isAuthenticated, quizController.getQuizId);
quizRoutes.put('/cursos/:cursoid/quiz/:quizid', isAuthenticated, quizController.putQuiz);

export { quizRoutes };
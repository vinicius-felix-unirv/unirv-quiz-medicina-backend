import { Router } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { QuizController } from '../controller/QuizController';


const quizRoutes = Router();
const quizController = new QuizController();

quizRoutes.post('/quiz', isAuthenticated, quizController.postQuiz);
quizRoutes.get('/quiz', isAuthenticated, quizController.getAllquiz);
quizRoutes.get('/quiz/:id', isAuthenticated, quizController.getQuizId);
quizRoutes.put('/quiz/:id', isAuthenticated, quizController.putQuiz);

export { quizRoutes };
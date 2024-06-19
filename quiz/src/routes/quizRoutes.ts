import { Router } from 'express';
// import { isAuthenticated } from '../middlewares/isAuthenticated';
import { QuizController } from '../controller/QuizController';


const quizRoutes = Router();
const quizController = new QuizController();
 
quizRoutes.post('/quiz',  quizController.postQuiz);
quizRoutes.get('/quiz/:skip/:take',  quizController.getAllquiz);
quizRoutes.get('/cursos/:cursoid/usuarios/:usuarioid/quiz/:skip/:take',  quizController.getAllQuizByUsuarioAndCursoId);
quizRoutes.get('/cursos/:cursoid/usuarios/:usuarioid/quiz-avaliativos/:skip/:take',  quizController.getAllQuizAvaliativoByUsuarioAndCursoId);
quizRoutes.get('/cursos/:id/quiz/:skip/:take', quizController.getAllquizByCursoId);
quizRoutes.get('/quiz/:id',  quizController.getQuizId);
quizRoutes.put('/quiz/:id',   quizController.putQuiz);
quizRoutes.put('/quiz/:id/status',  quizController.putStatusQuiz);

export { quizRoutes };
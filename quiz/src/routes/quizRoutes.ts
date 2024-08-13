import { Router } from 'express';
import { QuizController } from '../controller/QuizController';
import { authorize } from '../middlewares/isAuthenticated';


const quizRoutes = Router();
const quizController = new QuizController();
 
quizRoutes.post('/quiz', authorize([1, 2]), quizController.postQuiz);
quizRoutes.get('/quiz/:skip/:take', authorize([1 ]), quizController.getAllquiz);
quizRoutes.get('/cursos/:cursoid/usuarios/:usuarioid/quiz/:skip/:take', authorize([1, 2]), quizController.getAllQuizByUsuarioAndCursoId);
quizRoutes.get('/cursos/:cursoid/usuarios/:usuarioid/quiz-avaliativos/:skip/:take', authorize([1, 2]),  quizController.getAllQuizAvaliativoByUsuarioAndCursoId);
quizRoutes.get('/cursos/:id/quiz/:skip/:take', authorize([1, 2, 3]), quizController.getAllquizByCursoId);
quizRoutes.get('/quiz/:id', authorize([1, 2, 3]), quizController.getQuizId);
quizRoutes.put('/quiz/:id', authorize([1, 2 ]),  quizController.putQuiz);
quizRoutes.put('/quiz/:id/status', authorize([1, 2 ]),  quizController.putStatusQuiz);

export { quizRoutes };
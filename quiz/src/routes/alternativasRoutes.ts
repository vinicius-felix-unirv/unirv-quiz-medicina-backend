import { Router } from 'express';
import { authorize } from '../middlewares/isAuthenticated';
import { AlternativasController } from '../controller/AlternativasController';


const alternativasRoutes = Router();
const alternativasController = new AlternativasController();

alternativasRoutes.post('/alternativas', authorize([1, 2 ]), alternativasController.postAlternativa);
alternativasRoutes.post('/alternativas/many', authorize([1, 2 ]), alternativasController.postAllAlternativa);
alternativasRoutes.get('/perguntas/:id/alternativas', authorize([1, 2, 3]), alternativasController.getAllAlternativasByPerguntaId);
alternativasRoutes.put('/alternativas/:id', authorize([1, 2 ]), alternativasController.updateAlternativa);
alternativasRoutes.delete('/alternativas/:id', authorize([1, 2 ]), alternativasController.deleteAlternativa);

export { alternativasRoutes };
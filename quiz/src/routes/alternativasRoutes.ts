import { Router } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { AlternativasController } from '../controller/AlternativasController';


const alternativasRoutes = Router();
const alternativasController = new AlternativasController();

alternativasRoutes.post('/alternativas', isAuthenticated, alternativasController.postAlternativa);
alternativasRoutes.get('/alternativas/all/:id', isAuthenticated, alternativasController.getAllAlternativasByPerguntaId);
// alternativasRoutes.get('/alternativas/:id', isAuthenticated, alternativasController);
alternativasRoutes.put('/alternativas/:id', isAuthenticated, alternativasController.updateAlternativa);
// alternativasRoutes.delete('/alternativas/:id', isAuthenticated, alternativasController);

export { alternativasRoutes };
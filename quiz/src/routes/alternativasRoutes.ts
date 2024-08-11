import { Router } from 'express';
// import { isAuthenticated } from '../middlewares/isAuthenticated';
import { AlternativasController } from '../controller/AlternativasController';


const alternativasRoutes = Router();
const alternativasController = new AlternativasController();

alternativasRoutes.post('/alternativas',  alternativasController.postAlternativa);
alternativasRoutes.post('/alternativas/many',  alternativasController.postAllAlternativa);
alternativasRoutes.get('/perguntas/:id/alternativas',  alternativasController.getAllAlternativasByPerguntaId);
alternativasRoutes.put('/alternativas/:id',  alternativasController.updateAlternativa);
alternativasRoutes.delete('/alternativas/:id',  alternativasController.deleteAlternativa);

export { alternativasRoutes };
import { Router } from 'express';
import { RelatoriosController } from '../controller/RelatoriosController';
import { authorize } from '../middlewares/isAuthenticated';


const relatoriosRoutes = Router();
const relatoriosController = new RelatoriosController();


relatoriosRoutes.get('/relatorios', authorize([1, 2]), relatoriosController.getRelatorio);


export { relatoriosRoutes };
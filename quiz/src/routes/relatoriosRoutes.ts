import { Router } from 'express';
import { RelatoriosController } from '../controller/RelatoriosController';


const relatoriosRoutes = Router();
const relatoriosController = new RelatoriosController();


relatoriosRoutes.get('/relatorios', relatoriosController.getRelatorio);


export { relatoriosRoutes };
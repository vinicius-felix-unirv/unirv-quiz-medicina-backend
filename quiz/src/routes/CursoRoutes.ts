import { Router } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { CursoController } from '../controller/CursoController';

const cursoRoutes = Router();
const cursoController = new CursoController();

cursoRoutes.get('/cursos', isAuthenticated, cursoController.getAllCurso);


export { cursoRoutes };
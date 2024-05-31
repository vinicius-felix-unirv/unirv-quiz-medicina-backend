import { Router } from 'express';
import { CursoController } from '../controller/CursoController';

const cursoRoutes = Router();
const cursoController = new CursoController();

cursoRoutes.get('/cursos', cursoController.getAllCurso);


export { cursoRoutes };
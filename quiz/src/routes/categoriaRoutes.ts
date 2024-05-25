import { Router } from 'express';
import { CategoriasController } from '../controller/CategoriasController';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const categoriasRoutes = Router();
const categoriasController = new CategoriasController();

categoriasRoutes.post('/categorias', isAuthenticated, categoriasController.postCategoria);
categoriasRoutes.put('/categorias/:id', isAuthenticated, categoriasController.putCategoria);
categoriasRoutes.put('/categorias/:id/status', isAuthenticated, categoriasController.putStatusCategoria);
categoriasRoutes.get('/categorias/:id', isAuthenticated, categoriasController.getCategoriaId);
categoriasRoutes.get('/quiz/:id/categorias', isAuthenticated, categoriasController.getAllCategoriasInQuiz);
categoriasRoutes.get('quiz-avaliativos/:id/categorias', isAuthenticated, categoriasController.getAllCategoriasInQuizAvaliativo);
categoriasRoutes.get('/cursos/:id/categorias', isAuthenticated, categoriasController.getAllCategoriaByCursoId);

export { categoriasRoutes };

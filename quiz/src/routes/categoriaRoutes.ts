import { Router } from 'express';
import { CategoriasController } from '../controller/CategoriasController';
import { authorize } from '../middlewares/isAuthenticated';

const categoriasRoutes = Router();
const categoriasController = new CategoriasController();

categoriasRoutes.post('/categorias', authorize([1, 2 ]), categoriasController.postCategoria);
categoriasRoutes.put('/categorias/:id', authorize([1, 2 ]), categoriasController.putCategoria);
categoriasRoutes.put('/categorias/:id/status', authorize([1]), categoriasController.putStatusCategoria);
categoriasRoutes.get('/categorias/:id', authorize([1, 2, 3]), categoriasController.getCategoriaId);
categoriasRoutes.get('/quiz/:id/categorias', authorize([1, 2, 3]), categoriasController.getAllCategoriasInQuiz);
categoriasRoutes.get('/cursos/:id/categorias', authorize([1, 2, 3]), categoriasController.getAllCategoriaByCursoId);

export { categoriasRoutes };

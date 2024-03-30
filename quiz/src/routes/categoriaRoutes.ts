import { Router } from 'express';
import { CategoriasController } from '../controller/CategoriasController';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const categoriasRoutes = Router();
const categoriasController = new CategoriasController();

categoriasRoutes.post('/categoria', isAuthenticated, categoriasController.postCategoria);
categoriasRoutes.put('/categoria/:id', isAuthenticated, categoriasController.putCategoria);
categoriasRoutes.put('/categoria/status/:id', isAuthenticated, categoriasController.putStatusCategoria);
categoriasRoutes.get('/categoria/:id', isAuthenticated, categoriasController.getCategoriaId);
categoriasRoutes.get('/categorias/:cursoId', isAuthenticated, categoriasController.getAllCategoriaByCursoId);
categoriasRoutes.get('/categorias', isAuthenticated, categoriasController.getAllCategorias);

export { categoriasRoutes };

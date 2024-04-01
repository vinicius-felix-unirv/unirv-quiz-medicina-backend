import { Router } from 'express';
import { CategoriasController } from '../controller/CategoriasController';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const categoriasRoutes = Router();
const categoriasController = new CategoriasController();

categoriasRoutes.post('/categorias', isAuthenticated, categoriasController.postCategoria);
categoriasRoutes.put('/categorias/:id', isAuthenticated, categoriasController.putCategoria);
categoriasRoutes.put('/categorias/status/:id', isAuthenticated, categoriasController.putStatusCategoria);
categoriasRoutes.get('/categorias/:id', isAuthenticated, categoriasController.getCategoriaId);
categoriasRoutes.get('/categorias/:cursoid', isAuthenticated, categoriasController.getAllCategoriaByCursoId);
categoriasRoutes.get('/categorias', isAuthenticated, categoriasController.getAllCategorias);

export { categoriasRoutes };

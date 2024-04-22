import { Router } from 'express';
import { CategoriasController } from '../controller/CategoriasController';
// import { isAuthenticated } from '../middlewares/isAuthenticated';

const categoriasRoutes = Router();
const categoriasController = new CategoriasController();

categoriasRoutes.post('/categorias', categoriasController.postCategoria);
categoriasRoutes.put('/categorias/:id', categoriasController.putCategoria);
categoriasRoutes.put('/categorias/:id/status', categoriasController.putStatusCategoria);
categoriasRoutes.get('/categorias/:id', categoriasController.getCategoriaId);
categoriasRoutes.get('/curso/:id/categorias', categoriasController.getAllCategoriaByCursoId);

export { categoriasRoutes };

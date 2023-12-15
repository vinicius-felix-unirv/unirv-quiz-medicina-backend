import { Router } from 'express';
import { CategoriasController } from '../controller/CategoriasController';


const categoriasRoutes = Router();
const categoriasController = new CategoriasController();

categoriasRoutes.post('/categorias', categoriasController.postCategoria);
categoriasRoutes.put('/categorias/:id', categoriasController.putCategoria);
categoriasRoutes.put('/categorias/status/:id', categoriasController.putStatusCategoria);
categoriasRoutes.get('/categorias', categoriasController.getAllCategorias);


export {categoriasRoutes};

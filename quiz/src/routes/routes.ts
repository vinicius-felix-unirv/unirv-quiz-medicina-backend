import { Router } from 'express';
import { categoriasRoutes } from './categoriaRoutes';

const routes = Router();

routes.use(categoriasRoutes);

export default routes;
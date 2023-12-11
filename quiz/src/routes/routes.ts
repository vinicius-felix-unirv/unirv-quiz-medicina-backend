import { Router } from 'express';
import { categoriasRoutes } from './categoriaRoutes';
import { perguntasRoutes } from './perguntasRoutes';

const routes = Router();

routes.use(categoriasRoutes);
routes.use(perguntasRoutes);

export default routes;
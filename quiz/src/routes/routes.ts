import { Router } from 'express';
import { categoriasRoutes } from './categoriaRoutes';
import { perguntasRoutes } from './perguntasRoutes';
import { usuariosRoutes } from './usuarioRoutes';
import { authenticationRoutes } from './authenticationRoutes';

const routes = Router();

routes.use(categoriasRoutes);
routes.use(perguntasRoutes);
routes.use(usuariosRoutes);
routes.use(authenticationRoutes);

export default routes;
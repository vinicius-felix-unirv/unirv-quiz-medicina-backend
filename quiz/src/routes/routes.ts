import { Router } from 'express';
import { categoriasRoutes } from './categoriaRoutes';
import { perguntasRoutes } from './perguntasRoutes';
import { usuariosRoutes } from './usuarioRoutes';
import { authenticationRoutes } from './authenticationRoutes';
import { campusRoutes } from './campusRoutes';

const routes = Router();

routes.use(categoriasRoutes);
routes.use(perguntasRoutes);
routes.use(usuariosRoutes);
routes.use(authenticationRoutes);
routes.use(campusRoutes);

export default routes;
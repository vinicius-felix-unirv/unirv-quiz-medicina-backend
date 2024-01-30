import { Router } from 'express';
import { categoriasRoutes } from './categoriaRoutes';
import { perguntasRoutes } from './perguntasRoutes';
import { usuariosRoutes } from './usuarioRoutes';
import { authenticationRoutes } from './authenticationRoutes';
import { campusRoutes } from './campusRoutes';
import { perguntasNivelRoutes } from './PerguntasNivelRoutes';
import { progressoPerguntasRoutes } from './progressoPerguntasRoutes';

const routes = Router();

routes.use(categoriasRoutes);
routes.use(perguntasRoutes);
routes.use(usuariosRoutes);
routes.use(authenticationRoutes);
routes.use(campusRoutes);
routes.use(perguntasNivelRoutes);
routes.use(progressoPerguntasRoutes);


export default routes;
import { Router } from 'express';
import { categoriasRoutes } from './categoriaRoutes';
import { perguntasRoutes } from './perguntasRoutes';
import { usuariosRoutes } from './usuarioRoutes';
import { authenticationRoutes } from './authenticationRoutes';
import { campusRoutes } from './campusRoutes';
import { perguntasNivelRoutes } from './PerguntasNivelRoutes';
import { progressoPerguntasRoutes } from './progressoPerguntasRoutes';
import { quizRoutes } from './quizRoutes';
import { alternativasRoutes } from './alternativasRoutes';
import { sendEmailRoutes } from './sendEmailRoutes';
import { cursoRoutes } from './CursoRoutes';

const routes = Router();

routes.use(
    categoriasRoutes,
    perguntasRoutes,
    usuariosRoutes,
    authenticationRoutes,
    campusRoutes, 
    perguntasNivelRoutes, 
    progressoPerguntasRoutes, 
    quizRoutes,
    alternativasRoutes,
    sendEmailRoutes, 
    cursoRoutes
);



export default routes;
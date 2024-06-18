import { Router } from 'express';
import { categoriasRoutes } from './categoriaRoutes';
import { perguntasRoutes } from './perguntasRoutes';
import { usuariosRoutes } from './usuarioRoutes';
import { authenticationRoutes } from './authenticationRoutes';
import { campusRoutes } from './campusRoutes';
import { progressoPerguntasRoutes } from './progressoPerguntasRoutes';
import { quizRoutes } from './quizRoutes';
import { alternativasRoutes } from './alternativasRoutes';
import { sendEmailRoutes } from './sendEmailRoutes';
import { cursoRoutes } from './CursoRoutes';
import { quizAvaliativoUsuarioRoutes } from './quizAvaliativoUsuariosRoutes';
import { perguntasNivelRoutes } from './PerguntasNivelRoutes';


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
    cursoRoutes,
    quizAvaliativoUsuarioRoutes
);



export default routes;
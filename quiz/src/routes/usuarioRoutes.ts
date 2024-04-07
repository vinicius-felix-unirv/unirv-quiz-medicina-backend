import { Router } from 'express';
import { UsuariosController } from '../controller/UsuariosController';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const usuariosRoutes = Router();
const usuariosController = new UsuariosController();

usuariosRoutes.get('/usuarios/:id', isAuthenticated, usuariosController.getUsuarioById);
usuariosRoutes.get('/cursos/:id/usuarios/:skip/:take', isAuthenticated, usuariosController.getAllUsuarios);
usuariosRoutes.get('/cursos/:id/usuarios/ranking', isAuthenticated, usuariosController.getRankingByCursoId);
usuariosRoutes.post('/usuarios', usuariosController.postUsuario);
usuariosRoutes.post('/usuarios-campus', usuariosController.postUsuarioAndCampus);
usuariosRoutes.put('/usuarios/:id', isAuthenticated, usuariosController.putUsuario);
usuariosRoutes.put('/usuarios/:id/pontuacao', isAuthenticated, usuariosController.putPontuacao);
usuariosRoutes.put('/usuarios/:id/trocar-senha', isAuthenticated, usuariosController.putSenha);


export { usuariosRoutes };
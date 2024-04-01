import { Router } from 'express';
import { UsuariosController } from '../controller/UsuariosController';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const usuariosRoutes = Router();
const usuariosController = new UsuariosController();

usuariosRoutes.get('/usuarios/:id', isAuthenticated, usuariosController.getUsuarioById);
usuariosRoutes.get('/usuarios', isAuthenticated, usuariosController.getAllUsuarios);
usuariosRoutes.get('/usuarios/ranking', isAuthenticated, usuariosController.getRanking);
usuariosRoutes.post('/usuarios', usuariosController.postUsuario);
usuariosRoutes.put('/usuarios/:id', isAuthenticated, usuariosController.putUsuario);
usuariosRoutes.put('/usuarios/pontuacao/:id', isAuthenticated, usuariosController.putPontuacao);
usuariosRoutes.put('/usuarios/trocar-senha/:id', isAuthenticated, usuariosController.putSenha);


export { usuariosRoutes };
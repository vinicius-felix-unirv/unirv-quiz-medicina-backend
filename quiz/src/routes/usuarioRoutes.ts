import { Router } from 'express';
import { UsuariosController } from '../controller/UsuariosController';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const usuariosRoutes = Router();
const usuariosController = new UsuariosController();

usuariosRoutes.get('/usuario/:id', isAuthenticated, usuariosController.getUsuarioById);
usuariosRoutes.get('/usuarios', isAuthenticated, usuariosController.getAllUsuarios);
usuariosRoutes.post('/usuario', usuariosController.postUsuario);
usuariosRoutes.put('/usuario/:id', isAuthenticated, usuariosController.putUsuario);
usuariosRoutes.put('/usuario/pontuacao/:id', isAuthenticated, usuariosController.putPontuacao);
usuariosRoutes.put('/usuarios/trocar-senha/:id', isAuthenticated, usuariosController.putSenha);


export { usuariosRoutes };
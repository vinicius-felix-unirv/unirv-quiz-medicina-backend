import { Router } from 'express';
import { UsuariosController } from '../controller/UsuariosController';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const usuariosRoutes = Router();
const usuariosController = new UsuariosController();

usuariosRoutes.get('/usuarios/:id', isAuthenticated, usuariosController.getUsuarioById);
usuariosRoutes.get('/usuarios', isAuthenticated, usuariosController.getAllUsuarios);
usuariosRoutes.post('/usuarios', isAuthenticated, usuariosController.postUsuario);
usuariosRoutes.put('/usuarios/:id', isAuthenticated, usuariosController.putUsuario);

export { usuariosRoutes };
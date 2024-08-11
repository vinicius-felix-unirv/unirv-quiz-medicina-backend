import { Router } from 'express';
import { UsuariosController } from '../controller/UsuariosController';
// import { isAuthenticated } from '../middlewares/isAuthenticated';

const usuariosRoutes = Router();
const usuariosController = new UsuariosController();

usuariosRoutes.get('/usuarios/:id',  usuariosController.getUsuarioById);
usuariosRoutes.get('/cursos/:id/usuarios/:skip/:take',  usuariosController.getAllUsuarios);
usuariosRoutes.get('/cursos/:id/usuarios/ranking',  usuariosController.getRankingByCursoId);
usuariosRoutes.post('/usuarios', usuariosController.postUsuario);
usuariosRoutes.put('/usuarios/:id', usuariosController.putUsuario);
usuariosRoutes.put('/usuarios/:id/pontuacao',  usuariosController.putPontuacao);
usuariosRoutes.put('/usuarios/:id/trocar-senha', usuariosController.putSenha);


export { usuariosRoutes };
import { Router } from 'express';
import { UsuariosController } from '../controller/UsuariosController';
import { authorize } from '../middlewares/isAuthenticated';

const usuariosRoutes = Router();
const usuariosController = new UsuariosController();

usuariosRoutes.get('/usuarios/:id', authorize([1, 2, 3]),  usuariosController.getUsuarioById);
usuariosRoutes.get('/cursos/:id/usuarios/:skip/:take', authorize([1, 2 ]), usuariosController.getAllUsuarios);
usuariosRoutes.get('/cursos/:id/usuarios/ranking', authorize([1, 2, 3]), usuariosController.getRankingByCursoId);
usuariosRoutes.post('/usuarios',  usuariosController.postUsuario);
usuariosRoutes.put('/usuarios/:id', authorize([1, 2, 3]), usuariosController.putUsuario);
usuariosRoutes.put('/usuarios/:id/pontuacao', authorize([1, 2, 3]), usuariosController.putPontuacao);
usuariosRoutes.put('/usuarios/:id/trocar-senha',  usuariosController.putSenha);


export { usuariosRoutes };
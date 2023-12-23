import Container from 'typedi';
import { CategoriasService } from './CategoriasService';
import { PerguntasService } from './PerguntasService';
import { UsuarioService } from './UsuariosService';

const categoriasService = Container.get(CategoriasService);
const perguntaService = Container.get(PerguntasService);
const usuarioService = Container.get(UsuarioService);

export { categoriasService, perguntaService, usuarioService };
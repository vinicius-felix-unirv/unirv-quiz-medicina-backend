import Container from 'typedi';
import { CategoriasService } from './CategoriasService';
import { PerguntasService } from './PerguntasService';
import { UsuarioService } from './UsuariosService';
import { CampusService } from './CampusService';

const categoriasService = Container.get(CategoriasService);
const perguntaService = Container.get(PerguntasService);
const usuarioService = Container.get(UsuarioService);
const campusService = Container.get(CampusService);

export { categoriasService, perguntaService, usuarioService, campusService, };
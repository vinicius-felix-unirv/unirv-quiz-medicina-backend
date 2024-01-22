import Container from 'typedi';
import { CategoriasService } from './CategoriasService';
import { PerguntasService } from './PerguntasService';
import { UsuarioService } from './UsuariosService';
import { CampusService } from './CampusService';
import { PerguntasNivelService } from './PerguntasNivelService';

const categoriasService = Container.get(CategoriasService);
const perguntaService = Container.get(PerguntasService);
const usuarioService = Container.get(UsuarioService);
const campusService = Container.get(CampusService);
const perguntasNivelService = Container.get(PerguntasNivelService);

export { 
  categoriasService,
  perguntaService,
  usuarioService,
  campusService,
  perguntasNivelService,
};
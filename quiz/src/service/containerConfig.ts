import Container from 'typedi';
import { CategoriasService } from './CategoriasService';
import { PerguntasService } from './PerguntasService';
import { UsuarioService } from './UsuariosService';
import { QuizService } from './QuizService';
import { CampusService } from './CampusService';

const categoriasService = Container.get(CategoriasService);
const perguntaService = Container.get(PerguntasService);
const usuarioService = Container.get(UsuarioService);
const quizService = Container.get(QuizService);
const campusService = Container.get(CampusService);

export { categoriasService, perguntaService, usuarioService, campusService, quizService };


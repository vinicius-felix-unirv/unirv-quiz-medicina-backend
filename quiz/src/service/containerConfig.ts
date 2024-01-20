import Container from 'typedi';
import { CategoriasService } from './CategoriasService';
import { PerguntasService } from './PerguntasService';
import { UsuarioService } from './UsuariosService';
import { QuizService } from './QuizService';

const categoriasService = Container.get(CategoriasService);
const perguntaService = Container.get(PerguntasService);
const usuarioService = Container.get(UsuarioService);
const quizService = Container.get(QuizService);

export { categoriasService, perguntaService, usuarioService, quizService };
import Container from 'typedi';
import { CategoriasService } from './CategoriasService';
import { PerguntasService } from './PerguntasService';
import { UsuarioService } from './UsuariosService';
import { QuizService } from './QuizService';
import { CampusService } from './CampusService';
import { PerguntasNivelService } from './PerguntasNivelService';
import { ProgressoPerguntasService } from './ProgressoPerguntasService';
import { AlternativasService } from './AlternativasService';
import { SendEmailService } from './SendEmailService';
import { CursoService } from './CursoService';
import { QuizAvaliativoUsuarioService } from './QuizAvaliativoUsuarioService';


const categoriasService = Container.get(CategoriasService);
const perguntaService = Container.get(PerguntasService);
const usuarioService = Container.get(UsuarioService);
const quizService = Container.get(QuizService);
const campusService = Container.get(CampusService);
const perguntasNivelService = Container.get(PerguntasNivelService);
const progressoPerguntasService = Container.get(ProgressoPerguntasService);
const alternativasService = Container.get(AlternativasService);
const sendEmailService = Container.get(SendEmailService);
const cursoService = Container.get(CursoService);
const quizAvaliativoUsuarioService = Container.get(QuizAvaliativoUsuarioService);


export {
  categoriasService,
  perguntaService,
  usuarioService,
  campusService,
  perguntasNivelService,
  quizService,
  progressoPerguntasService, 
  alternativasService,
  sendEmailService, 
  cursoService,
  quizAvaliativoUsuarioService
};


import Container from 'typedi';
import { CategoriasService } from './CategoriasService';
import { PerguntasService } from './PerguntasService';
import { UsuarioService } from './UsuariosService';
import { QuizService } from './QuizService';
import { CampusService } from './CampusService';
import { PerguntasNivelService } from './PerguntasNivelService';
import { ProgressoPerguntasService } from './ProgressoPerguntasService';
import { AlternativasService } from './AlternativasService';


const categoriasService = Container.get(CategoriasService);
const perguntaService = Container.get(PerguntasService);
const usuarioService = Container.get(UsuarioService);
const quizService = Container.get(QuizService);
const campusService = Container.get(CampusService);
const perguntasNivelService = Container.get(PerguntasNivelService);
const progressoPerguntasService = Container.get(ProgressoPerguntasService);
const alternativasService = Container.get(AlternativasService);


export {
  categoriasService,
  perguntaService,
  usuarioService,
  campusService,
  perguntasNivelService,
  quizService,
  progressoPerguntasService, 
  alternativasService
};


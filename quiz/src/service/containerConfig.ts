import Container from 'typedi';
import { CategoriasService } from './CategoriasService';
import { PerguntasService } from './PerguntasService';

const categoriasService = Container.get(CategoriasService);
const perguntaService = Container.get(PerguntasService);

export { categoriasService, perguntaService };
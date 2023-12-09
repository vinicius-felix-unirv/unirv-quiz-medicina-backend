import Container from 'typedi';
import { CategoriasService } from './CategoriasService';

const categoriasService = Container.get(CategoriasService);

export { categoriasService };
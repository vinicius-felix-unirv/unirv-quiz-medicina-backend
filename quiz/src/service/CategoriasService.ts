import { categorias } from '@prisma/client';
import { IcategoriaDTO } from '../model/CategoriasDTO';
import categoriasRepository from '../repository/categoriasRepository';
import { Service } from 'typedi';

@Service()
export class CategoriasService{

  async saveCategoria(categoria: IcategoriaDTO): Promise<categorias> {

    const categoriaExist = await categoriasRepository.getCategoria(categoria.descricao);

    if(categoriaExist != null) throw new Error('Categoria já existe');

    const newCategoria = categoriasRepository.createCategoria(categoria);

    return newCategoria;
  }
}
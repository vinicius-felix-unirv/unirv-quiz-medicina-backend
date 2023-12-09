import { categorias } from '@prisma/client';
import { CategoriasDTO } from '../model/CategoriasDTO';
import categoriasRepository from '../repository/categoriasRepository';
import { Service } from 'typedi';

@Service()
export class CategoriasService{

  async saveCategoria(categoria: CategoriasDTO): Promise<categorias> {

    const categoriaExist = await categoriasRepository.getCategoria(categoria.getDescricao());

    if(categoriaExist != null) throw new Error('Categoria já existe');

    const newCategoria = await categoriasRepository.createCategoria(categoria);

    return newCategoria;
  }

  async alterCategoria(descricao: string, categoria: CategoriasDTO): Promise<categorias> {

    const categoriaExist = await categoriasRepository.getCategoria(descricao);

    if(categoriaExist == null) throw new Error('Categoria não existe');

    const updatedCategoria = await categoriasRepository.updateCategoria(categoriaExist.id, categoria);

    return updatedCategoria;
  }
}
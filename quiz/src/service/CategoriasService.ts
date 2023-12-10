
import { CategoriasDTO } from '../model/CategoriasDTO';
import categoriasRepository from '../repository/categoriasRepository';
import { Service } from 'typedi';

@Service()
export class CategoriasService{

  async saveCategoria(categoria: CategoriasDTO): Promise<CategoriasDTO> {

    const categoriaExist = await categoriasRepository.getCategoria(categoria.getDescricao());

    if(categoriaExist != null) throw new Error('Categoria já existe');

    const newCategoria = await categoriasRepository.createCategoria(categoria);

    return new CategoriasDTO(newCategoria.descricao ?? '', newCategoria.status, newCategoria.id);
  }

  async alterCategoria(descricao: string, categoria: CategoriasDTO): Promise<CategoriasDTO> {

    const categoriaExist = await categoriasRepository.getCategoria(descricao);

    if(categoriaExist == null) throw new Error('Categoria não existe');

    const updatedCategoria = await categoriasRepository.updateCategoria(categoriaExist.id, categoria);

    return new CategoriasDTO(updatedCategoria.descricao ?? '', updatedCategoria.status, updatedCategoria.id);
  }

  async getAllCategorias(): Promise<CategoriasDTO[]> {

    const categorias = await categoriasRepository.getAllCategorias();

    const categoriasDTOs = categorias.map((categoria) => new CategoriasDTO(categoria.descricao ?? '', categoria.status, categoria.id));


    return categoriasDTOs;
  }
}

import { CategoriasDTO } from '../model/CategoriasDTO';
import categoriasRepository from '../repository/categoriasRepository';
import { Service } from 'typedi';

@Service()
export class CategoriasService{

  async saveCategoria(categoria: CategoriasDTO): Promise<CategoriasDTO> {

    const categoriaExist = await categoriasRepository.getCategoria(categoria.getDescricao() ?? '');

    if(categoriaExist != null) throw new Error('Categoria já existe');

    const newCategoria = await categoriasRepository.createCategoria(categoria);

    return new CategoriasDTO(newCategoria);
  }

  async alterCategoria(id: number, categoria: CategoriasDTO): Promise<CategoriasDTO> {

    const categoriaExist = await categoriasRepository.getCategoriaId(id);

    if(categoriaExist == null) throw new Error('Categoria não existe');

    const updatedCategoria = await categoriasRepository.updateCategoria(id, categoria);

    return new CategoriasDTO(updatedCategoria);
  }

  async getAllCategorias(): Promise<CategoriasDTO[]> {

    const categorias = await categoriasRepository.getAllCategorias();

    const categoriasDTOs = categorias.map((categoria) => new CategoriasDTO(categoria));


    return categoriasDTOs;
  }
}
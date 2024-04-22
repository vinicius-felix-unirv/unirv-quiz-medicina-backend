
import { BadRequestError } from '../exception/BadRequestError';
import { NotFoundError } from '../exception/NotFoundError';
import { CategoriasDTO } from '../model/CategoriasDTO';
import categoriasRepository from '../repository/categoriasRepository';
import { Service } from 'typedi';
import { cursoService } from './containerConfig';
import { categorias } from '@prisma/client';

@Service()
export class CategoriasService {

  async checksCategoriaExistsByDescricao(descricao: string, cursoId: number): Promise<void>{

    const categoriaExist = await categoriasRepository.getCategoriaByDescricaoAndCursoId(descricao, cursoId);

    if (categoriaExist) throw new BadRequestError('Categoria ja existe');
  }

  async checksCategoriaExistsById(id: number): Promise<categorias>{

    const categoriaExist = await categoriasRepository.getCategoriaId(id);

    if (!categoriaExist) throw new NotFoundError('Categoria nao encontrada');

    return categoriaExist;
  }

  async saveCategoria(categoria: CategoriasDTO): Promise<CategoriasDTO> {

    await Promise.all([
      this.checksCategoriaExistsByDescricao(categoria.getDescricao(), categoria.getCursoId()),
      cursoService.checksCursoExistsById(categoria.getCursoId())
    ]);

    const newCategoria = await categoriasRepository.createCategoria(categoria);

    return new CategoriasDTO(newCategoria);
  }

  async alterCategoria(id: number, categoria: CategoriasDTO): Promise<CategoriasDTO> {

    const categoriaExist = await this.checksCategoriaExistsById(id);

    const descricaoRegistered = await categoriasRepository.getCategoriaByDescricaoAndCursoId(categoria.getDescricao(), categoriaExist.cursoId);

    if(descricaoRegistered && descricaoRegistered.id != id) throw new BadRequestError('Categoria ja existe');

    const updatedCategoria = await categoriasRepository.updateCategoria(id, categoria);

    return new CategoriasDTO(updatedCategoria);
  }

  async alterStatusCategoria(id: number): Promise<CategoriasDTO> {

    const categoriaExist = await this.checksCategoriaExistsById(id);

    const categoria = new CategoriasDTO(categoriaExist);

    categoria.setStatus(!categoria.getStatus());

    const updatedCategoria = await categoriasRepository.updateStatusCategorias(id, categoria);

    return new CategoriasDTO(updatedCategoria);
  }

  async getCategoriaId(id: number): Promise<CategoriasDTO> {

    const categoriaExist = await this.checksCategoriaExistsById(id);

    return new CategoriasDTO(categoriaExist);
  }

  async getAllCategoriasByCursoId(cursoId: number): Promise<CategoriasDTO[]> {

    await cursoService.checksCursoExistsById(cursoId);

    const allCategoriasByCurso = await categoriasRepository.getAllCategoriasByCursoId(cursoId);

    return allCategoriasByCurso.map(categorias => new CategoriasDTO(categorias));

  }
}
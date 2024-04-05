import { categorias } from '@prisma/client';
import { prisma } from '../db/quizClientPrisma';
import { CategoriasDTO } from '../model/CategoriasDTO';



export default {

  async getCategoria(descricao: string): Promise<categorias | null> {
    
    const categoria = await prisma.categorias.findFirst({where: {descricao: descricao}});

    return categoria;
  },

  async getCategoriaId(id: number): Promise<categorias | null> {
    
    const categoria = await prisma.categorias.findFirst({where: {id: id}});

    return categoria;
  },

  async createCategoria(categoria: CategoriasDTO): Promise<categorias>{

    const newCategoria = await prisma.categorias.create(
      {
        data: 
        {
          descricao: categoria.getDescricao(), 
          status: categoria.getStatus(),
          imagem: categoria.getImagem(),
          cursoId: categoria.getCursoId()
        }
      });

    return newCategoria;
  },

  async updateCategoria(id: number, categoria: CategoriasDTO): Promise<categorias> {

    const updatedCategory = await prisma.categorias.update(
      { where: {id: id}, 
        data: {
          descricao: categoria.getDescricao(),
          imagem: categoria.getImagem(),
          cursoId: categoria.getCursoId()
        }
      }
    );

    return updatedCategory;
  },

  async getAllCategoriasByCursoId(cursoId: number): Promise<categorias[]> {

    const allCategoriasByCurso = await prisma.categorias.findMany({
      where: { cursoId: cursoId}
    });

    return allCategoriasByCurso;
  },

  async updateStatusCategorias(id: number, categoria: CategoriasDTO): Promise<categorias> {

    const statusUpdatet = await prisma.categorias.update({
      where: {id: id},
      data: { status: categoria.getStatus()}
    });

    return statusUpdatet;
  }

};
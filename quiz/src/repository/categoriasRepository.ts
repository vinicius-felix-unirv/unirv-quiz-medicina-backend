import { categorias } from '@prisma/client';
import { prisma } from '../db/quizClientPrisma';
import { CategoriasDTO } from '../model/CategoriasDTO';



export default {

  async getCategoria(descricao: string): Promise<categorias> {
    
    const categoria = await prisma.categorias.findFirst({where: {descricao: descricao}});

    return categoria!;
  },

  async createCategoria(categoria: CategoriasDTO): Promise<categorias>{

    const newCategoria = prisma.categorias.create({data: {descricao: categoria.getDescricao(), status: categoria.getStatus()}});

    return newCategoria;
  },

};
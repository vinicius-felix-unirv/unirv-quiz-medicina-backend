import { categorias } from '@prisma/client';
import { prisma } from '../db/quizClientPrisma';
import { IcategoriaDTO } from '../model/CategoriasDTO';


export default {

  async getCategoria(descricao: string): Promise<categorias> {
    
    const categoria = await prisma.categorias.findFirst({where: {descricao: descricao}});

    return categoria!;
  },

  async createCategoria(categoria: IcategoriaDTO): Promise<categorias>{

    const newCategoria = prisma.categorias.create({data: {descricao: categoria.descricao, status: categoria.status}});

    return newCategoria;
  },

};
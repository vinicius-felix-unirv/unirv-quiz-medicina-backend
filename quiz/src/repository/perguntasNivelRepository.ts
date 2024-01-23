import { perguntasnivel } from '@prisma/client';
import { PerguntasNivelDTO } from '../model/PerguntasNivelDTO';
import { prisma } from '../db/quizClientPrisma';

export default {

  async createPerguntasNivel(perguntasNivel: PerguntasNivelDTO): Promise<perguntasnivel> {
        
    const newPerguntasNivel = await prisma.perguntasnivel.create(
      {
        data: {
          nivel: perguntasNivel.getNivel(),
          pontuacao: perguntasNivel.getPontuacao(),
          tempo: perguntasNivel.getTempo()
        }
      });
    
    return newPerguntasNivel;
  },

  async getPerguntasNivelById(id: number): Promise<perguntasnivel | null>{

    const perguntaNivel = await prisma.perguntasnivel.findUnique({
      where: {id: id}
    });

    return perguntaNivel;
  },

  async getPerguntasNivelByNivel(nivel: number): Promise<perguntasnivel | null>{

    const perguntaNivel = await prisma.perguntasnivel.findFirst({
      where: {nivel: nivel}
    });

    return perguntaNivel;
  },

  async getAllPerguntasNivel(): Promise<perguntasnivel[]>{

    const perguntaNivel = await prisma.perguntasnivel.findMany();

    return perguntaNivel;
  },

  async alterPerguntasNivel(id: number, perguntasNivel: PerguntasNivelDTO): Promise<perguntasnivel> {

    const updatedPerguntaNivel = await prisma.perguntasnivel.update({
      where: { id: id},
      data: {
        nivel: perguntasNivel.getNivel(),
        pontuacao: perguntasNivel.getPontuacao(),
        tempo: perguntasNivel.getTempo()
      }
    });

    return updatedPerguntaNivel;

  },

  async deletePerguntasNivel(id: number): Promise<void> {

    await prisma.perguntasnivel.delete({where: {id: id}});
  }
};
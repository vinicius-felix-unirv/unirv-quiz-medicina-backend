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
};
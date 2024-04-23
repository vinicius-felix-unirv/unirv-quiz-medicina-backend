import { perguntasnivel } from '@prisma/client';
import { prisma } from '../db/quizClientPrisma';

export default {

  async getPerguntasNivelById(id: number): Promise<perguntasnivel | null>{

    const perguntaNivel = await prisma.perguntasnivel.findUnique({
      where: {id: id}
    });

    return perguntaNivel;
  },

  async getAllPerguntasNivel(): Promise<perguntasnivel[]>{

    const perguntaNivel = await prisma.perguntasnivel.findMany();

    return perguntaNivel;
  }
};
import { perguntas } from '@prisma/client';
import { prisma } from '../db/quizClientPrisma';
import { PerguntaDTO } from '../model/PerguntaDTO';

export default {

  async getPergunta(id: number): Promise<perguntas> {

    const pergunta = await prisma.perguntas.findUnique({ where: { id: id } });

    return pergunta!;
  },

  async getAllPerguntas(): Promise<perguntas[]> {

    const perguntas = await prisma.perguntas.findMany();

    return perguntas;
  },

  async createPergunta(pergunta: PerguntaDTO): Promise<perguntas> {

    const newPergunta = await prisma.perguntas.create(
      {
        data:
        {
          conteudo: pergunta.getConteudo(),
          nivel: pergunta.getNivel(),
          tempo: pergunta.getTempo(),
          pathimage: pergunta.getPathImage(),
          status: pergunta.getStatus()
        }
      }
    );

    return newPergunta;
  },

  async updatePergunta(id: number, pergunta: PerguntaDTO): Promise<perguntas> {

    const updatedPergunta = await prisma.perguntas.update(

      {
        where: { id: id },
        data:
        {
          conteudo: pergunta.getConteudo(),
          nivel: pergunta.getNivel(),
          tempo: pergunta.getTempo(),
          pathimage: pergunta.getPathImage(),
          status: pergunta.getStatus()
        }
      }
    );

    return updatedPergunta;
  }


};
import { perguntas } from '@prisma/client';
import { prisma } from '../db/quizClientPrisma';
import { PerguntaDTO } from '../model/PerguntaDTO';

export default {

  async getPergunta(pergunta: PerguntaDTO): Promise<perguntas | null> {

    const newPergunta = await prisma.perguntas.findFirst(
      { where: { 
        conteudo: pergunta.getConteudo(),
        pathimage: pergunta.getPathImage(),
        categoriasid: pergunta.getCategoriasId(),
      } });

    return newPergunta;
  },

  async getPerguntaById(id: number): Promise<perguntas | null> {

    const pergunta = await prisma.perguntas.findUnique({ where: { id: id } });

    return pergunta;
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
          perguntasnivelid: pergunta.getPerguntasNivelId(),
          tempo: pergunta.getTempo(),
          pathimage: pergunta.getPathImage(),
          categoriasid: pergunta.getCategoriasId(),
          quizid: pergunta.getQuizId()
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
          perguntasnivelid: pergunta.getPerguntasNivelId(),
          tempo: pergunta.getTempo(),
          pathimage: pergunta.getPathImage(),
          status: pergunta.getStatus(),
          categoriasid: pergunta.getCategoriasId(),
          quizid: pergunta.getQuizId()
        }
      }
    );

    return updatedPergunta;
  }


};
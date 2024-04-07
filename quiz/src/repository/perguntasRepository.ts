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

  async getAllPerguntasByQuizId(skip: number, take: number, quizId: number, userId: number): Promise<perguntas[]> {
    const perguntas = await prisma.perguntas.findMany({
      skip: skip,
      take: take,
      where: {
        quizid: quizId,
        progressoperguntas: {
          none: {
            usuariosid: userId
          }
        }
      }
    });

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
          categoriasid: pergunta.getCategoriasId()
        }
      }
    );

    return updatedPergunta;
  },

  async updateStatusPergunta(id: number, pergunta: PerguntaDTO): Promise<perguntas> {

    const statusUpdatet = await prisma.perguntas.update({
      where: { id: id},
      data: { status: pergunta.getStatus()}
    });

    return statusUpdatet;
  }


};
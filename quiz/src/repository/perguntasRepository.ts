import { perguntas } from '@prisma/client';
import { prisma } from '../db/quizClientPrisma';
import { PerguntaDTO } from '../model/PerguntaDTO';

export default {

  
  async getPerguntaByQuiz(pergunta: PerguntaDTO, quizId: number): Promise<perguntas | null> {

    const newPergunta = await prisma.perguntas.findFirst({ 
      where: { 
        conteudo: pergunta.getConteudo(),
        categoriasid: pergunta.getCategoriasId(),
        quizid: quizId
      } 
    });

    return newPergunta;
  },

  async getPerguntaById(id: number): Promise<perguntas | null> {

    const pergunta = await prisma.perguntas.findUnique({ where: { id: id } });

    return pergunta;
  },

  async getAllPerguntasByQuizIdAnCategoriaPagination(take: number, quizId: number, userId: number, categoriaId: number): Promise<perguntas[]> {
    const perguntas = await prisma.perguntas.findMany({
      take: take,
      where: {
        categoriasid: categoriaId,
        quizid: quizId,
        progressoperguntas: {
          none: {
            usuariosid: userId
          }
        },
        status: true
      },
    });

    return perguntas;
  },

  async getAllPerguntasByQuizId(quizId: number): Promise<perguntas[]>{

    const perguntas =  await prisma.perguntas.findMany({
      where: {quizid: quizId}
    });

    return perguntas;
  },

  async getPerguntasByQuizAndCategoria(quizId: number, categoriaId: number): Promise<perguntas[]>{

    const perguntas =  await prisma.perguntas.findMany({
      where: {
        quizid: quizId,
        categoriasid: categoriaId
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
          quizid: pergunta.getQuizId(),
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
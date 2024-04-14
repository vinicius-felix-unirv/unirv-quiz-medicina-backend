import { progressoperguntas } from '@prisma/client';
import { ProgressoPerguntasDTO } from '../model/ProgressoPerguntasDTO';
import { prisma } from '../db/quizClientPrisma';


export default {

  async createProgressoPergunta(progressoPergunta: ProgressoPerguntasDTO): Promise<progressoperguntas>{
        
    const progressoPerg = await prisma.progressoperguntas.create({
      data: {
        usuariosid: progressoPergunta.getUsuariosId(),
        perguntasid: progressoPergunta.getPerguntasId()
      }
    });

    return progressoPerg;
  },

  async getProgressoPerguntasByUsuario(id: number): Promise<progressoperguntas[]>{

    const progressoPerguntasByUsuario = await prisma.progressoperguntas.findMany({
      where: {
        usuariosid: id
      }
    });

    return progressoPerguntasByUsuario;
  },

  async getProgressoPerguntasByQuiz(quizId: number, userId: number): Promise<progressoperguntas[]>{

    const progressoPerguntasByUsuario = await prisma.progressoperguntas.findMany({
      where: {
        AND: [
          {
            usuariosid: userId
          },
          {
            perguntas: {
              quizid: quizId
            }
          }
        ]
         
      }
    });

    return progressoPerguntasByUsuario;
  },

  async getProgressoPerguntasByCategoria(quizId: number, userId: number, categoriaId: number): Promise<progressoperguntas[]>{

    const progressoPerguntasByUsuario = await prisma.progressoperguntas.findMany({
      where: {
        AND: [
          {
            usuariosid: userId
          },
          {
            perguntas: {
              quizid: quizId,
              categoriasid: categoriaId
            }
          }
        ]
         
      }
    });

    return progressoPerguntasByUsuario;
  },

  
};
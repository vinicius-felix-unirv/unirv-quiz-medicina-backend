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

  
};
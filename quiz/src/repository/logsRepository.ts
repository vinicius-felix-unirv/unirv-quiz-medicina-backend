import { prisma } from '../db/quizClientPrisma';
import { LogsDTO } from '../model/LogsDTO';


export default {

  async createLogs(logs: LogsDTO): Promise<void>{
        
    await prisma.logs.create({
      data: {
        usuariosid: logs.getUsuariosId(),
        descricao: logs.getDescricao()
      }
    });

  }
};
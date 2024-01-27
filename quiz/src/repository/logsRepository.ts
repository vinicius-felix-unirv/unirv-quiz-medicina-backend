import { prisma } from '../db/quizClientPrisma';
import { LogsDTO } from '../model/LogsDTO';
import { logs } from '@prisma/client';

export default {

  async createLogs(logs: LogsDTO): Promise<logs>{
        
    const newLog = await prisma.logs.create({
      data: {
        usuariosid: logs.getUsuariosId(),
        descricao: logs.getDescricao()
      }
    });

    return newLog;

  }
};
import { campus } from '@prisma/client';
import { CampusDTO } from '../model/CampusDTO';
import { prisma } from '../db/quizClientPrisma';

export default{

  async getCampusByUserId(id: number): Promise<campus | null>{

    const campusByUserId = await prisma.campus.findUnique({
      where: { id: id },
    });

    return campusByUserId;
  },

  async createCampus(campus: CampusDTO): Promise<campus>{
    
    const newCampus = await prisma.campus.create({

      data: {       
        curso: campus.getCurso(),
        turma: campus.getTurma(),
        periodo: campus.getPeriodo(),
        nome: campus.getNome(),
        usuariosid: campus.getUsuarioId()
      }
    });

    return newCampus;
  },


};
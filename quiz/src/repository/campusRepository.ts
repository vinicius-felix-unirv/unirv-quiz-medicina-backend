import { campus } from '@prisma/client';
import { CampusDTO } from '../model/CampusDTO';
import { prisma } from '../db/quizClientPrisma';

export default {

  async getAllCampusByUserId(id: number): Promise<campus[] | null>{

    const campusByUserId = await prisma.campus.findMany({ where: {usuariosid: id} });

    return campusByUserId;
  },

  async getCampusByUserId(id: number): Promise<campus | null>{

    const campusByUserId = await prisma.campus.findFirst({ where: {id: id} });

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

  async putCampus(id: number, campus: CampusDTO): Promise<campus> {

    const updatedCampus = await prisma.campus.update({
      where: { id: id },
      data: {
        curso: campus.getCurso(),
        turma: campus.getTurma(),
        periodo: campus.getPeriodo(),
        nome: campus.getNome(),
        usuariosid: campus.getUsuarioId()
      }
    });

    return updatedCampus;
  },

  async deleteCampus(id: number): Promise<void>{

    await prisma.campus.delete({where: {id: id}});

  }

};
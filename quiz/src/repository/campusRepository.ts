import { campus } from '@prisma/client';
import { CampusDTO } from '../model/CampusDTO';
import { prisma } from '../db/quizClientPrisma';

export default {

  async getAllCampus(): Promise<campus[]> {

    const campus = await prisma.campus.findMany();

    return campus;
  },
  
  async getCampusById(id: number): Promise<campus | null>{

    const campusByUserId = await prisma.campus.findFirst({ where: {id: id} });

    return campusByUserId;
  },

  async createCampus(campus: CampusDTO): Promise<campus>{
    
    const newCampus = await prisma.campus.create({

      data: {       
        nomecampus: campus.getNomeCampus()
      }
    });

    return newCampus;
  },

  async putCampus(id: number, campus: CampusDTO): Promise<campus> {

    const updatedCampus = await prisma.campus.update({
      where: { id: id },
      data: {
        nomecampus: campus.getNomeCampus()
      }
    });

    return updatedCampus;
  },

  async deleteCampus(id: number): Promise<void>{

    await prisma.campus.delete({where: {id: id}});

  }

};
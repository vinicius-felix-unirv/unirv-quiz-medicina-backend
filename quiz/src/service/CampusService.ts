import { Service } from 'typedi';
import { CampusDTO } from '../model/CampusDTO';
import campusRepository from '../repository/campusRepository';
import { BadRequestError } from '../exception/BadRequestError';
import { NotFoundError } from '../exception/NotFoundError';
import { campus } from '@prisma/client';

@Service()
export class CampusService{

  async campusAlreadyExists(nomeCampus: string): Promise<void>{

    const campusList = await campusRepository.getAllCampus();

    const campusExists = campusList.some(c => c.nomecampus === nomeCampus);

    if(campusExists) throw new BadRequestError('Campus ja existe');
  }

  async campusExistsById(id: number): Promise<campus> {

    const campus = await campusRepository.getCampusById(id);

    if(!campus) throw new NotFoundError('Campus nao encontrado');
    
    return campus;
  }

  async createCampus(campus: CampusDTO): Promise<CampusDTO>{

    await this.campusAlreadyExists(campus.getNomeCampus());

    const newCampus = await campusRepository.createCampus(campus);

    return new CampusDTO(newCampus);

  }

  async getAllCampus(): Promise<CampusDTO[]> {

    const campus = await campusRepository.getAllCampus();

    return campus.map(campus => new CampusDTO(campus));
  }

  async getCampusById(id: number): Promise<CampusDTO> {

    const campus = await this.campusExistsById(id);

    return new CampusDTO(campus);
  }

  async updatedCampus(id: number, campus: CampusDTO): Promise<CampusDTO>{

    await this.campusExistsById(id);

    await this.campusAlreadyExists(campus.getNomeCampus());

    const updatedCampus = await campusRepository.putCampus(id, campus);

    return new CampusDTO(updatedCampus);
  }

  async deleteCampus(id: number): Promise<void> {

    await this.campusExistsById(id);

    await campusRepository.deleteCampus(id);
    
  }


}
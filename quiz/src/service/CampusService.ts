import { Service } from 'typedi';
import { CampusDTO } from '../model/CampusDTO';
import campusRepository from '../repository/campusRepository';
import { BadRequestError } from '../exception/BadRequestError';
import { NotFoundError } from '../exception/NotFoundError';

@Service()
export class CampusService{

  async createCampus(campus: CampusDTO): Promise<CampusDTO>{

    const campusList = await campusRepository.getAllCampus();

    const campusExists = campusList.some(c => c.nomecampus === campus.getNomeCampus());

    if(campusExists) throw new BadRequestError('Campus ja existe');

    const newCampus = await campusRepository.createCampus(campus);

    return new CampusDTO(newCampus);

  }

  async getAllCampus(): Promise<CampusDTO[]> {

    const campus = await campusRepository.getAllCampus();

    return campus.map(campus => new CampusDTO(campus));
  }

  async getCampusById(id: number): Promise<CampusDTO> {

    const campusByUserId = await campusRepository.getCampusById(id);

    if(!campusByUserId)  throw new NotFoundError('Campus nao encontrado');

    return new CampusDTO(campusByUserId);
  }

  async updatedCampus(id: number, campus: CampusDTO): Promise<CampusDTO>{

    const campusExist = await campusRepository.getCampusById(id);

    if(!campusExist)  throw new NotFoundError('Campus nao encontrado');

    const campusList = await campusRepository.getAllCampus();

    const campusAlreadyExists = campusList.some(c => c.nomecampus === campus.getNomeCampus());

    if(campusAlreadyExists) throw new BadRequestError('Campus ja existe');

    const updatedCampus = await campusRepository.putCampus(id, campus);

    return new CampusDTO(updatedCampus);
  }

  async deleteCampus(id: number): Promise<void> {

    const campusExist = await campusRepository.getCampusById(id);

    if(!campusExist) throw new NotFoundError('Campus nao encontrado');

    await campusRepository.deleteCampus(id);
    
  }


}
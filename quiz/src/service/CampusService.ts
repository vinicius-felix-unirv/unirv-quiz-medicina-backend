import { Service } from 'typedi';
import { CampusDTO } from '../model/CampusDTO';
import campusRepository from '../repository/campusRepository';
import { BadRequestError } from '../exception/BadRequestError';
import { NotFoundError } from '../exception/NotFoundError';

@Service()
export class CampusService{

  async createCampus(data: CampusDTO): Promise<CampusDTO>{
        
    const campusList = await campusRepository.getAllCampusByUserId(data.getUsuarioId()!);

    const campusExist = campusList?.filter(campus => campus.curso === data.getCurso());

    if(campusExist?.length != 0) throw new BadRequestError('Campus already exists');

    const newCampus = await campusRepository.createCampus(data);

    return new CampusDTO(newCampus);

  }

  async getAllCampusByUserId(id: number): Promise<CampusDTO[] | undefined> {

    const campusByUserId = await campusRepository.getAllCampusByUserId(id);

    return campusByUserId?.map(campus => new CampusDTO(campus));
  }

  async getCampusByUserId(id: number): Promise<CampusDTO> {

    const campusByUserId = await campusRepository.getCampusByUserId(id);

    if(campusByUserId === null)  throw new NotFoundError('Campus not found');

    return new CampusDTO(campusByUserId!);
  }

  async updatedCampus(id: number, campus: CampusDTO): Promise<CampusDTO>{

    const campusExist = await campusRepository.getCampusByUserId(id);

    if(campusExist === null)  throw new NotFoundError('Campus not found');

    const updatedCampus = await campusRepository.putCampus(id, campus);

    return new CampusDTO(updatedCampus);
  }

  async deleteCampus(id: number): Promise<void> {

    const campusExist = await campusRepository.getCampusByUserId(id);

    if(campusExist === null)  throw new NotFoundError('Campus not found');

    await campusRepository.deleteCampus(id);
  }


}
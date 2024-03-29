import { Service } from 'typedi';
import { CampusDTO } from '../model/CampusDTO';
import campusRepository from '../repository/campusRepository';
import { BadRequestError } from '../exception/BadRequestError';
import { NotFoundError } from '../exception/NotFoundError';
import usuariosRepository from '../repository/usuariosRepository';

@Service()
export class CampusService{

  async createCampus(data: CampusDTO): Promise<CampusDTO>{

    const usuariosidExists = await usuariosRepository.getUsuarioById(data.getUsuarioId());

    if(!usuariosidExists) throw new NotFoundError('Usuarios nao encontrados');
        
    const campusList = await campusRepository.getAllCampusByUserId(data.getUsuarioId());

    const campusExist = campusList.some(campus => campus.cursoid === data.getCursoId());

    if(campusExist) throw new BadRequestError('Campus ja existe');

    const newCampus = await campusRepository.createCampus(data);

    return new CampusDTO(newCampus);

  }

  async getAllCampusByUserId(id: number): Promise<CampusDTO[]> {

    const campusByUserId = await campusRepository.getAllCampusByUserId(id);

    return campusByUserId.map(campus => new CampusDTO(campus));
  }

  async getCampusByUserId(id: number): Promise<CampusDTO> {

    const campusByUserId = await campusRepository.getCampusByUserId(id);

    if(!campusByUserId)  throw new NotFoundError('Campus nao encontrado');

    return new CampusDTO(campusByUserId);
  }

  async updatedCampus(id: number, campus: CampusDTO): Promise<CampusDTO>{

    const campusExist = await campusRepository.getCampusByUserId(id);

    if(!campusExist)  throw new NotFoundError('Campus nao encontrado');

    const campusList = await campusRepository.getAllCampusByUserId(campus.getUsuarioId());

    const campusAlreadyExists = campusList.filter(c => c.cursoid === campus.getCursoId());

    if(campusAlreadyExists.length != 0 && campusAlreadyExists[0].id != id) throw new BadRequestError('Campus ja existe');

    const updatedCampus = await campusRepository.putCampus(id, campus);

    return new CampusDTO(updatedCampus);
  }

  async deleteCampus(id: number): Promise<void> {

    const campusExist = await campusRepository.getCampusByUserId(id);

    if(!campusExist)  throw new NotFoundError('Campus nao encontrado');

    await campusRepository.deleteCampus(id);
    
  }


}
import { Service } from 'typedi';
import { CursoDTO } from '../model/CursoDTO';
import cursoRepository from '../repository/cursoRepository';

@Service()
export class CursoService{
    
    async getAllCurso(): Promise<CursoDTO[]>{

        const allCurso = await cursoRepository.getAllCurso();

        return allCurso.map(curso => new CursoDTO(curso));

    }
}
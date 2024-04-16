import { Service } from 'typedi';
import { CursoDTO } from '../model/CursoDTO';
import cursoRepository from '../repository/cursoRepository';
import { NotFoundError } from '../exception/NotFoundError';

@Service()
export class CursoService{

    async cursoExistsById(id: number): Promise<void>{

        const cursoExists = await cursoRepository.getCursoById(id);

        if(!cursoExists) throw new NotFoundError('Curso nao encontrado');
    }
    
    async getAllCurso(): Promise<CursoDTO[]>{

        const allCurso = await cursoRepository.getAllCurso();

        return allCurso.map(curso => new CursoDTO(curso));

    }
}
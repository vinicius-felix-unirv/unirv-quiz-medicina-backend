import { Service } from 'typedi';
import { NotFoundError } from '../exception/NotFoundError';
import perguntasNivelRepository from '../repository/perguntasNivelRepository';
import { PerguntasNivelDTO } from '../model/PerguntasNivelDTO';
import { perguntasnivel } from '@prisma/client';

@Service()
export class PerguntasNivelService{

  async checksNivelExists(id: number): Promise<perguntasnivel>{
    const perguntaNivelExists = await perguntasNivelRepository.getPerguntasNivelById(id);

    if(!perguntaNivelExists) throw new NotFoundError('Nivel nao encontrado');

    return perguntaNivelExists;
  }

  async getNivelById(id: number): Promise<PerguntasNivelDTO> {

    const nivelExists = await this.checksNivelExists(id); 

    return new PerguntasNivelDTO(nivelExists);
  }

  async getAllNivel(): Promise<PerguntasNivelDTO[]> {

    const niveis = await perguntasNivelRepository.getAllPerguntasNivel();

    return niveis.map(nivel => new PerguntasNivelDTO(nivel));
  }

}
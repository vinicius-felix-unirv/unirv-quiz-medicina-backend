import { Service } from 'typedi';
import { BadRequestError } from '../exception/BadRequestError';
import { PerguntasNivelDTO } from '../model/PerguntasNivelDTO';
import perguntasNivelRepository from '../repository/perguntasNivelRepository';
import { NotFoundError } from '../exception/NotFoundError';

@Service()
export class PerguntasNivelService{

  async createPerguntNivel(perguntaNivel: PerguntasNivelDTO): Promise<PerguntasNivelDTO>{

    const perguntasNivelExists = await perguntasNivelRepository.getPerguntasNivelByNivel(perguntaNivel.getNivel());

    if(perguntasNivelExists) throw new BadRequestError('Esse nivel ja existe');
        
    const newPerguntasNivel = await perguntasNivelRepository.createPerguntasNivel(perguntaNivel);

    return new PerguntasNivelDTO(newPerguntasNivel);
  }

  async getPerguntasNivelById(id: number): Promise<PerguntasNivelDTO>{

    const perguntaNivelExists = await perguntasNivelRepository.getPerguntasNivelById(id);

    if(!perguntaNivelExists) throw new NotFoundError('Nivel nao encontrado');

    return new PerguntasNivelDTO(perguntaNivelExists);
  }

  async getAllPerguntasNivel(): Promise<PerguntasNivelDTO[]> {

    const perguntasNivel = await perguntasNivelRepository.getAllPerguntasNivel();

    return perguntasNivel.map(perguntasNivel => new PerguntasNivelDTO(perguntasNivel));
  }

  async updatePerguntasNivel(id: number, perguntasNivel: PerguntasNivelDTO): Promise<PerguntasNivelDTO> {

    const perguntasNivelExists = await perguntasNivelRepository.getPerguntasNivelById(id);

    if(!perguntasNivelExists) throw new NotFoundError('Nivel nao encontrado');

    const perguntasNivelAlreadyExists = await perguntasNivelRepository.getPerguntasNivelByNivel(perguntasNivel.getNivel());

    if(perguntasNivelAlreadyExists != null && perguntasNivelAlreadyExists.id != id) throw new BadRequestError('Nivel ja existe');

    const updatedPerguntasNivel = await perguntasNivelRepository.alterPerguntasNivel(id, perguntasNivel);

    return new PerguntasNivelDTO(updatedPerguntasNivel);
  }

  async deletePerguntasNivel(id: number): Promise<void> {

    const perguntasNivelExists = await perguntasNivelRepository.getPerguntasNivelById(id);

    if (!perguntasNivelExists) throw new NotFoundError('Nivel nao encontrado');

    await perguntasNivelRepository.deletePerguntasNivel(id);
    
  }


}
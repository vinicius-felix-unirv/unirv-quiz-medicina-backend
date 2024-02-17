import { Service } from 'typedi';
import { BadRequestError } from '../exception/BadRequestError';
import { PerguntasNivelDTO } from '../model/PerguntasNivelDTO';
import perguntasNivelRepository from '../repository/perguntasNivelRepository';
import { NotFoundError } from '../exception/NotFoundError';

@Service()
export class PerguntasNivelService{

  async createPerguntNivel(perguntaNivel: PerguntasNivelDTO): Promise<PerguntasNivelDTO>{

    const perguntasNivelExists = await perguntasNivelRepository.getPerguntasNivelByNivel(perguntaNivel.getNivel());

    if(perguntasNivelExists != null ) throw new BadRequestError('PerguntasNivel already exists');
        
    const newPerguntasNivel = await perguntasNivelRepository.createPerguntasNivel(perguntaNivel);

    return new PerguntasNivelDTO(newPerguntasNivel);
  }

  async getPerguntasNivelById(id: number): Promise<PerguntasNivelDTO | null>{

    const perguntaNivelExists = await perguntasNivelRepository.getPerguntasNivelById(id);

    if(perguntaNivelExists === null) throw new NotFoundError('PerguntaNivel not found');

    return new PerguntasNivelDTO(perguntaNivelExists);
  }

  async getAllPerguntasNivel(): Promise<PerguntasNivelDTO[]> {

    const perguntasNivel = await perguntasNivelRepository.getAllPerguntasNivel();

    return perguntasNivel.map(perguntasNivel => new PerguntasNivelDTO(perguntasNivel));
  }

  async updatePerguntasNivel(id: number, perguntasNivel: PerguntasNivelDTO): Promise<PerguntasNivelDTO> {

    const perguntasNivelExists = await perguntasNivelRepository.getPerguntasNivelById(id);

    if(perguntasNivelExists === null) throw new NotFoundError('PerguntasNivel not found');

    const perguntasNivelAlreadyExists = await perguntasNivelRepository.getPerguntasNivelByNivel(perguntasNivel.getNivel());

    if(!(perguntasNivelAlreadyExists?.id === id)) throw new BadRequestError('PerguntasNivel already exists');

    const updatedPerguntasNivel = await perguntasNivelRepository.alterPerguntasNivel(id, perguntasNivel);

    return new PerguntasNivelDTO(updatedPerguntasNivel);
  }

  async deletePerguntasNivel(id: number): Promise<void> {

    const perguntasNivelExists = await perguntasNivelRepository.getPerguntasNivelById(id);

    if (perguntasNivelExists === null) throw new NotFoundError('PerguntasNivel not found');

    await perguntasNivelRepository.deletePerguntasNivel(id);
    
  }


}
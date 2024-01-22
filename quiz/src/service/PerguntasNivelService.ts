import { Service } from 'typedi';
import { BadRequestError } from '../exception/BadRequestError';
import { PerguntasNivelDTO } from '../model/PerguntasNivelDTO';
import perguntasNivelRepository from '../repository/perguntasNivelRepository';

@Service()
export class PerguntasNivelService{

  async createPerguntNivel(perguntaNivel: PerguntasNivelDTO): Promise<PerguntasNivelDTO>{

    const perguntasNivelExists = await perguntasNivelRepository.getPerguntasNivelByNivel(perguntaNivel.getNivel());

    if(perguntasNivelExists != null ) throw new BadRequestError('PerguntasNivel already exists');
        
    const newPerguntasNivel = await perguntasNivelRepository.createPerguntasNivel(perguntaNivel);

    return new PerguntasNivelDTO(newPerguntasNivel);
  }


}
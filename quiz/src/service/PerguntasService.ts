import { Service } from 'typedi';
import { PerguntaDTO } from '../model/PerguntaDTO';
import perguntasRepository from '../repository/perguntasRepository';

@Service()
export class PerguntasService {

  async savePergunta(pergunta: PerguntaDTO): Promise<PerguntaDTO> {
        
    const newPergunta = await perguntasRepository.createPergunta(pergunta);

    return new PerguntaDTO(newPergunta);
  }
}
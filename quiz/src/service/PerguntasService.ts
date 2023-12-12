import { Service } from 'typedi';
import { PerguntaDTO } from '../model/PerguntaDTO';
import perguntasRepository from '../repository/perguntasRepository';

@Service()
export class PerguntasService {

  async savePergunta(pergunta: PerguntaDTO): Promise<PerguntaDTO> {
        
    const newPergunta = await perguntasRepository.createPergunta(pergunta);

    return new PerguntaDTO(newPergunta);
  }

  async alterPergunta(id: number, pergunta: PerguntaDTO): Promise<PerguntaDTO> {

    const perguntaExists = await perguntasRepository.getPergunta(id);

    if(perguntaExists == null) throw new Error('Pergunta not found');

    const updatedPergunta = await perguntasRepository.updatePergunta(id, pergunta);

    return new PerguntaDTO(updatedPergunta);
  }

}
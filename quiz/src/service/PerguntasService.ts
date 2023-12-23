import { Service } from 'typedi';
import { PerguntaDTO } from '../model/PerguntaDTO';
import perguntasRepository from '../repository/perguntasRepository';
import { NotFoundError } from '../exception/NotFoundError';

@Service()
export class PerguntasService {

  async getPergunta(id: number): Promise<PerguntaDTO> {

    const perguntaExists = await perguntasRepository.getPergunta(id);

    if (perguntaExists == null) throw new NotFoundError('pergunta not found');

    return new PerguntaDTO(perguntaExists);

  }

  async getAllPerguntas(): Promise<PerguntaDTO[]> {

    const perguntas = await perguntasRepository.getAllPerguntas();

    const perguntasDTOs = perguntas.map((pergunta) => new PerguntaDTO(pergunta));

    return perguntasDTOs;

  }

  async savePergunta(pergunta: PerguntaDTO): Promise<PerguntaDTO> {

    const newPergunta = await perguntasRepository.createPergunta(pergunta);

    if (!newPergunta) throw new NotFoundError('pergunta not found');

    return new PerguntaDTO(newPergunta);
  }

  async alterPergunta(id: number, pergunta: PerguntaDTO): Promise<PerguntaDTO> {

    const perguntaExists = await perguntasRepository.getPergunta(id);

    if (perguntaExists == null) throw new NotFoundError('pergunta not found');

    const updatedPergunta = await perguntasRepository.updatePergunta(id, pergunta);

    return new PerguntaDTO(updatedPergunta);
  }

  async alterStatusPergunta(id: number): Promise<PerguntaDTO> {

    const perguntaExists = await perguntasRepository.getPergunta(id);

    if (perguntaExists == null) throw new NotFoundError('pergunta not found');

    const pergunta = new PerguntaDTO(perguntaExists);

    pergunta.setStatus(!pergunta.getStatus());

    const updatedPergunta = await perguntasRepository.updatePergunta(id, pergunta);

    return new PerguntaDTO(updatedPergunta);
  }

}
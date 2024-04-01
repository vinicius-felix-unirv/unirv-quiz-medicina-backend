import { Service } from 'typedi';
import { PerguntaDTO } from '../model/PerguntaDTO';
import perguntasRepository from '../repository/perguntasRepository';
import { NotFoundError } from '../exception/NotFoundError';
import { BadRequestError } from '../exception/BadRequestError';

@Service()
export class PerguntasService {

  async getPerguntaById(id: number): Promise<PerguntaDTO> {

    const perguntaExists = await perguntasRepository.getPerguntaById(id);

    if (!perguntaExists) throw new NotFoundError('Pergunta nao encontrada');

    return new PerguntaDTO(perguntaExists);

  }

  async getAllPerguntas(): Promise<PerguntaDTO[]> {

    const perguntas = await perguntasRepository.getAllPerguntas();

    const perguntasDTOs = perguntas.map((pergunta) => new PerguntaDTO(pergunta));

    return perguntasDTOs;

  }

  async savePergunta(pergunta: PerguntaDTO): Promise<PerguntaDTO> {

    const perguntaExist = await perguntasRepository.getPergunta(pergunta);

    if (perguntaExist) throw new BadRequestError('Pergunta ja existe');

    const newPergunta = await perguntasRepository.createPergunta(pergunta);

    return new PerguntaDTO(newPergunta);
  }

  async alterPergunta(id: number, pergunta: PerguntaDTO): Promise<PerguntaDTO> {

    const perguntaExists = await perguntasRepository.getPerguntaById(id);

    if (!perguntaExists) throw new NotFoundError('Pergunta nao encontrada');

    const perguntaAlreadyExists = await perguntasRepository.getPergunta(pergunta);

    if (perguntaAlreadyExists) throw new BadRequestError('Pergunta ja existe');

    const updatedPergunta = await perguntasRepository.updatePergunta(id, pergunta);

    return new PerguntaDTO(updatedPergunta);
  }

  async alterStatusPergunta(id: number): Promise<PerguntaDTO> {

    const perguntaExists = await perguntasRepository.getPerguntaById(id);

    if (!perguntaExists) throw new NotFoundError('Pergunta nao encontrada');

    const pergunta = new PerguntaDTO(perguntaExists);

    pergunta.setStatus(!pergunta.getStatus());

    const updatedPergunta = await perguntasRepository.updatePergunta(id, pergunta);

    return new PerguntaDTO(updatedPergunta);
  }

}
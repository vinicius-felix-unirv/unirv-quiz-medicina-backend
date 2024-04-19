import { Service } from 'typedi';
import { PerguntaDTO } from '../model/PerguntaDTO';
import perguntasRepository from '../repository/perguntasRepository';
import { NotFoundError } from '../exception/NotFoundError';
import { BadRequestError } from '../exception/BadRequestError';
import quizRepository from '../repository/quizRepository';
import perguntasNivelRepository from '../repository/perguntasNivelRepository';
import categoriasRepository from '../repository/categoriasRepository';
import usuariosRepository from '../repository/usuariosRepository';
import { perguntas } from '@prisma/client';

@Service()
export class PerguntasService {

  async perguntaExistsById(id: number): Promise<perguntas> {

    const perguntaExists = await perguntasRepository.getPerguntaById(id);

    if(!perguntaExists) throw new NotFoundError('Pergunta nao encontrada');

    return perguntaExists;
  }

  async getPerguntaById(id: number): Promise<PerguntaDTO> {

    const pergunta = await this.perguntaExistsById(id);

    return new PerguntaDTO(pergunta);

  }

  // modificar;
  async getAllPerguntasByQuizId(skip: number, take: number, quizId: number, userId: number): Promise<PerguntaDTO[]> {
    const quizExists = await quizRepository.getQuizById(quizId);

    if(!quizExists) throw new NotFoundError('Quiz nao encontrado');

    const userExists = await usuariosRepository.getUsuarioById(userId);

    if(!userExists) throw new NotFoundError('Usuario nao encontrado');

    const perguntas = await perguntasRepository.getAllPerguntasByQuizIdPagination(skip, take, quizId, userId);

    const perguntasDTOs = perguntas.map((pergunta) => new PerguntaDTO(pergunta));

    return perguntasDTOs;

  }

  async savePergunta(pergunta: PerguntaDTO): Promise<PerguntaDTO> {

    const perguntaExist = await perguntasRepository.getPergunta(pergunta);

    if(perguntaExist) throw new BadRequestError('Pergunta ja existe');

    const nivelExists = await perguntasNivelRepository.getPerguntasNivelById(pergunta.getPerguntasNivelId());

    if(!nivelExists) throw new NotFoundError('Nivel nao encontrado');

    const categoriasExists = await categoriasRepository.getCategoriaId(pergunta.getCategoriasId());

    if(!categoriasExists) throw new NotFoundError('Categoria nao encontrada');

    // await quizService.quizExistsById(pergunta.getQuizId()!);

    // ainda temos que validar se existe algum quiz;

    const newPergunta = await perguntasRepository.createPergunta(pergunta);

    return new PerguntaDTO(newPergunta);
  }

  async alterPergunta(id: number, pergunta: PerguntaDTO): Promise<PerguntaDTO> {

    await this.perguntaExistsById(id);

    const perguntaAlreadyExists = await perguntasRepository.getPergunta(pergunta);

    if (perguntaAlreadyExists) throw new BadRequestError('Pergunta ja existe');

    const nivelExists = await perguntasNivelRepository.getPerguntasNivelById(pergunta.getPerguntasNivelId());

    if(!nivelExists) throw new NotFoundError('Nivel nao encontrado');

    const categoriasExists = await categoriasRepository.getCategoriaId(pergunta.getCategoriasId());

    if(!categoriasExists) throw new NotFoundError('Categoria nao encontrada');

    const updatedPergunta = await perguntasRepository.updatePergunta(id, pergunta);

    return new PerguntaDTO(updatedPergunta);
  }

  async alterStatusPergunta(id: number): Promise<PerguntaDTO> {

    const perguntaExists = await this.perguntaExistsById(id);

    const pergunta = new PerguntaDTO(perguntaExists);

    pergunta.setStatus(!pergunta.getStatus());

    const updatedPergunta = await perguntasRepository.updateStatusPergunta(id, pergunta);

    return new PerguntaDTO(updatedPergunta);
  }

}
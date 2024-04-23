import { Service } from 'typedi';
import { PerguntaDTO } from '../model/PerguntaDTO';
import perguntasRepository from '../repository/perguntasRepository';
import { NotFoundError } from '../exception/NotFoundError';
import { BadRequestError } from '../exception/BadRequestError';
import { perguntas } from '@prisma/client';
import { categoriasService, perguntasNivelService, quizAvaliativoService, quizService, usuarioService } from './containerConfig';

@Service()
export class PerguntasService {

  async checksPerguntaExistsById(id: number): Promise<perguntas> {

    const perguntaExists = await perguntasRepository.getPerguntaById(id);

    if(!perguntaExists) throw new NotFoundError('Pergunta nao encontrada');

    return perguntaExists;
  }

  async checksPerguntaExistsInQuiz(pergunta: PerguntaDTO, quizId: number): Promise<void> {

    const perguntaExist = await perguntasRepository.getPerguntaByQuiz(pergunta, quizId);

    if(perguntaExist) throw new BadRequestError('Pergunta ja existe no quiz');
  }

  async checksPerguntaExistsInQuizAvaliativo(pergunta: PerguntaDTO, quizAvaliativoId: number): Promise<void> {

    const perguntaExist = await perguntasRepository.getPerguntaByQuizAvaliativo(pergunta, quizAvaliativoId);
    
    if(perguntaExist) throw new BadRequestError('Pergunta ja existe no quiz-avaliativo');
  }

  async validateAttributes(pergunta: PerguntaDTO): Promise<void> {

    if(pergunta.getQuizId()){
      await Promise.all([
        quizService.checksQuizExistsById(pergunta.getQuizId()!),
        this.checksPerguntaExistsInQuiz(pergunta, pergunta.getQuizId()!),
        perguntasNivelService.checksNivelExists(pergunta.getPerguntasNivelId()),
        categoriasService.checksCategoriaExistsById(pergunta.getCategoriasId())
      ]);

    }else{
      await Promise.all([
        quizAvaliativoService.checksQuizAvaliativoExistsById(pergunta.getQuizAvaliativoId()!),
        this.checksPerguntaExistsInQuizAvaliativo(pergunta, pergunta.getQuizAvaliativoId()!),
        perguntasNivelService.checksNivelExists(pergunta.getPerguntasNivelId()),
        categoriasService.checksCategoriaExistsById(pergunta.getCategoriasId())
      ]);
      
    }
  }

  async getPerguntaById(id: number): Promise<PerguntaDTO> {

    const pergunta = await this.checksPerguntaExistsById(id);

    return new PerguntaDTO(pergunta);

  }

  async getAllPerguntasByQuizIdAndCategoria(skip: number, take: number, quizId: number, userId: number, categoriaId: number): Promise<PerguntaDTO[]> {
    
    await Promise.all([
      quizService.checksQuizExistsById(quizId),
      usuarioService.checksUsuarioExistsById(userId),
      categoriasService.checksCategoriaExistsById(categoriaId)
    ]);

    const perguntas = await perguntasRepository.getAllPerguntasByQuizIdAnCategoriaPagination(skip, take, quizId, userId, categoriaId);

    return perguntas.map((pergunta) => new PerguntaDTO(pergunta));

  }

  async getAllPerguntasByQuizAvaliativoIdAndCategoria(skip: number, take: number, quizAvaliativoId: number, userId: number, categoriaId: number): Promise<PerguntaDTO[]> {
    
    await Promise.all([
      quizAvaliativoService.checksQuizAvaliativoExistsById(quizAvaliativoId),
      usuarioService.checksUsuarioExistsById(userId),
      categoriasService.checksCategoriaExistsById(categoriaId)
    ]);

    const perguntas = await perguntasRepository.getAllPerguntasByQuizAvaliativoIdAnCategoriaPagination(skip, take, quizAvaliativoId, userId, categoriaId);

    return perguntas.map((pergunta) => new PerguntaDTO(pergunta));

  }

  async savePergunta(pergunta: PerguntaDTO): Promise<PerguntaDTO> {

    await this.validateAttributes(pergunta);

    const newPergunta = await perguntasRepository.createPergunta(pergunta);

    return new PerguntaDTO(newPergunta);
  }

  async alterPergunta(id: number, pergunta: PerguntaDTO): Promise<PerguntaDTO> {

    const perguntaExists = await this.checksPerguntaExistsById(id);

    if(perguntaExists.quizid){
      const [perguntadb] = await Promise.all([
        perguntasRepository.getPerguntaByQuiz(pergunta, perguntaExists.quizid),
        perguntasNivelService.checksNivelExists(pergunta.getPerguntasNivelId()),
        categoriasService.checksCategoriaExistsById(pergunta.getCategoriasId())
      ]);

      if(perguntadb && perguntadb.id != id) throw new BadRequestError('Pergunta ja existe');
    }else{
      const [perguntadb] = await Promise.all([
        perguntasRepository.getPerguntaByQuizAvaliativo(pergunta, perguntaExists.quizavaliativoid!),
        perguntasNivelService.checksNivelExists(pergunta.getPerguntasNivelId()),
        categoriasService.checksCategoriaExistsById(pergunta.getCategoriasId())
      ]);

      if(perguntadb && perguntadb.id != id) throw new BadRequestError('Pergunta ja existe');
    }

    const updatedPergunta = await perguntasRepository.updatePergunta(id, pergunta);

    return new PerguntaDTO(updatedPergunta);
  }

  async alterStatusPergunta(id: number): Promise<PerguntaDTO> {

    const perguntaExists = await this.checksPerguntaExistsById(id);

    const pergunta = new PerguntaDTO(perguntaExists);

    pergunta.setStatus(!pergunta.getStatus());

    const updatedPergunta = await perguntasRepository.updateStatusPergunta(id, pergunta);

    return new PerguntaDTO(updatedPergunta);
  }

}
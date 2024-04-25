import { Service } from 'typedi';
import { AllProgressoPerguntasDTO, ProgressoPerguntasDTO } from '../model/ProgressoPerguntasDTO';
import progressoPerguntasRepository from '../repository/progressoPerguntasRepository';
import { BadRequestError } from '../exception/BadRequestError';
import perguntasRepository from '../repository/perguntasRepository';
import { categoriasService, perguntaService, quizService, usuarioService } from './containerConfig';
import { progressoperguntas } from '@prisma/client';


@Service()
export class ProgressoPerguntasService{


  checksIfProgressoPerguntaExists(progresso: progressoperguntas[], perguntaId: number): void {

    const progressoExists = progresso.some( p => p.perguntasid === perguntaId);

    if(progressoExists) throw new BadRequestError('Progresso ja existe');
  }
  async createProgressoPerg(progressoPergunta: ProgressoPerguntasDTO): Promise<ProgressoPerguntasDTO>{

    await Promise.all([
      usuarioService.checksUsuarioExistsById(progressoPergunta.getUsuariosId()),
      perguntaService.checksPerguntaExistsById(progressoPergunta.getPerguntasId())
    ]);
  
    const progressoPergByUsuario = await progressoPerguntasRepository.getProgressoPerguntasByUsuario(progressoPergunta.getUsuariosId());

    this.checksIfProgressoPerguntaExists(progressoPergByUsuario, progressoPergunta.getPerguntasId());

    const progressoPerg = await progressoPerguntasRepository.createProgressoPergunta(progressoPergunta);

    return new ProgressoPerguntasDTO(progressoPerg);
  }

  async createManyProgressoPergunta(data: AllProgressoPerguntasDTO): Promise<ProgressoPerguntasDTO[]> {

    const progressoPergByUsuario = await progressoPerguntasRepository.getProgressoPerguntasByUsuario(data.progressoPerguntas[0].getUsuariosId());
    
    for(const progressoPerguntas of data.progressoPerguntas){

      await usuarioService.checksUsuarioExistsById(progressoPerguntas.getUsuariosId());

      await perguntaService.checksPerguntaExistsById(progressoPerguntas.getPerguntasId());

      this.checksIfProgressoPerguntaExists(progressoPergByUsuario, progressoPerguntas.getPerguntasId());
      
      const perguntasRepeated = new Set<number>();
      
      data.progressoPerguntas.forEach(p => perguntasRepeated.add(p.getPerguntasId()));

      if(perguntasRepeated.size != data.progressoPerguntas.length) throw new BadRequestError('As perguntas não podem se repetir');

    }

    const allProgressoPerguntasDTO: ProgressoPerguntasDTO[] = [];

    for(const progressoPerguntas of data.progressoPerguntas){

      const progressoPergSaved = await progressoPerguntasRepository.createProgressoPergunta(progressoPerguntas);

      allProgressoPerguntasDTO.push(new ProgressoPerguntasDTO(progressoPergSaved));
    }
   
    return allProgressoPerguntasDTO;

  }

  async getProgressoPerguntasByQuiz(quizId: number, usuarioId: number): Promise<{progressoAtual: number, progressoTotal: number}> {

    await Promise.all([
      quizService.checksQuizExistsById(quizId),
      usuarioService.checksUsuarioExistsById(usuarioId)
    ]);

    const progresso = await progressoPerguntasRepository.getProgressoPerguntasByQuiz(quizId, usuarioId);

    const perguntasTotal = await perguntasRepository.getAllPerguntasByQuizId(quizId);

    return { progressoAtual: progresso.length, progressoTotal: perguntasTotal.length};
  }

  async getProgressoPerguntasByCategoria(quizId: number, usuarioId: number, categoriaId: number): Promise<{progressoAtual: number, progressoTotal: number}> {

    await Promise.all([
      quizService.checksQuizExistsById(quizId),
      usuarioService.checksUsuarioExistsById(usuarioId),
      categoriasService.checksCategoriaExistsById(categoriaId)
    ]);

    const progresso = await progressoPerguntasRepository.getProgressoPerguntasByCategoria(quizId, usuarioId, categoriaId);

    const perguntasTotal = await perguntasRepository.getPerguntasByQuizAndCategoria(quizId, categoriaId);

    return { progressoAtual: progresso.length, progressoTotal: perguntasTotal.length};
  }


}

import { Service } from 'typedi';
import { BadRequestError } from '../exception/BadRequestError';
import { NotFoundError } from '../exception/NotFoundError';
import { QuizDTO } from '../model/QuizDTO';
import quizRepository from '../repository/quizRepository';
import { cursoService, usuarioService } from './containerConfig';
import { quiz } from '@prisma/client';

@Service()
export class QuizService {

  async checksQuizExistsByTituloAndCurso(titulo: string, cursoId: number): Promise<quiz> {

    const quizExist = await quizRepository.getQuizByTituloAndCurso(titulo, cursoId);

    if(quizExist) throw new BadRequestError('Quiz ja existe');

    return quizExist!;
  }

  async checksQuizExistsById(id: number): Promise<quiz> {

    const quizExist = await quizRepository.getQuizById(id);

    if(!quizExist) throw new NotFoundError('Quiz nao encontrado');

    return quizExist;
  }

  async saveQuiz(quiz: QuizDTO): Promise<QuizDTO> {

    await Promise.all([
      this.checksQuizExistsByTituloAndCurso(quiz.getTitulo(), quiz.getCursoId()),
      cursoService.checksCursoExistsById(quiz.getCursoId()),
      usuarioService.checksUsuarioExistsById(quiz.getUsuarioId())
    ]);

    const newQuiz = await quizRepository.createQuiz(quiz);

    return new QuizDTO(newQuiz);
  }

  async updateQuiz(quizId: number, quiz: QuizDTO): Promise<QuizDTO> {

    const quizExists = await this.checksQuizExistsById(quizId);

    const quizBytitulo = await quizRepository.getQuizByTituloAndCurso(quiz.getTitulo(), quizExists.cursoid);

    if(quizBytitulo && quizId != quizBytitulo.id) throw new BadRequestError('Quiz ja existe');

    const updatedquiz = await quizRepository.updateQuiz(quizId, quiz);

    return new QuizDTO(updatedquiz);
  }

  async getAllQuiz(skip: number, take: number): Promise<QuizDTO[]> {

    const quizs = await quizRepository.getAllQuiz(skip, take);

    const quizsDTOs = quizs.map((quiz) => new QuizDTO(quiz));

    return quizsDTOs;
  }

  async getAllQuizByCurosId(skip: number, take: number, cursoId: number): Promise<QuizDTO[]> {

    await cursoService.checksCursoExistsById(cursoId);

    const quizs = await quizRepository.getAllQuizByCursoId(skip, take, cursoId);

    const quizsDTOs = quizs.map((quiz) => new QuizDTO(quiz));

    return quizsDTOs;
  }

  async getQuizById(id: number): Promise<QuizDTO> {

    const quiz = await this.checksQuizExistsById(id);

    return new QuizDTO(quiz);
  }

  async getAllQuizByUsuarioAndCursoId(skip: number, take: number, cursoId: number, usuarioId: number): Promise<QuizDTO[]> {

    const quizByUsuario = await quizRepository.getAllQuizByUsuarioAndCursoId(skip, take, cursoId, usuarioId);

    return quizByUsuario.map(quiz => new QuizDTO(quiz));
  }

  async getAllQuizAvaliativoByUsuarioAndCursoId(skip: number, take: number, cursoId: number, usuarioId: number): Promise<QuizDTO[]> {

    const quizAvaliativoByUsuario = await quizRepository.getAllQuizAvaliativoByUsuarioAndCursoId(skip, take, cursoId, usuarioId);

    return quizAvaliativoByUsuario.map(quiz => new QuizDTO(quiz));
  }

  async putStatusQuiz(quizId: number): Promise<QuizDTO> {

    const quizExists = await this.checksQuizExistsById(quizId);

    const quiz = new QuizDTO(quizExists);
    quiz.setStatus(!quiz.getStatus());
    const quizUpdated = await quizRepository.putStatusQuiz(quizId, quiz);

    return new QuizDTO(quizUpdated);
  }
}
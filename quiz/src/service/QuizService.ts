
import { Service } from 'typedi';
import { BadRequestError } from '../exception/BadRequestError';
import { NotFoundError } from '../exception/NotFoundError';
import { QuizDTO } from '../model/QuizDTO';
import quizRepository from '../repository/quizRepository';
import { cursoService } from './containerConfig';
import { quiz } from '@prisma/client';

@Service()
export class QuizService {

  async checksQuizExistsByTitulo(titulo: string): Promise<void> {

    const quizExist = await quizRepository.getQuizByTitulo(titulo);

    if(quizExist) throw new BadRequestError('Quiz ja existe');
  }

  async checksQuizExistsById(id: number): Promise<quiz> {

    const quizExist = await quizRepository.getQuizById(id);

    if(!quizExist) throw new NotFoundError('Quiz nao encontrado');

    return quizExist;
  }

  async saveQuiz(quiz: QuizDTO): Promise<QuizDTO> {

    await this.checksQuizExistsByTitulo(quiz.getTitulo());

    await cursoService.checksCursoExistsById(quiz.getCursoId());

    const newQuiz = await quizRepository.createQuiz(quiz);

    return new QuizDTO(newQuiz);
  }

  async updateQuiz(id: number, quiz: QuizDTO): Promise<QuizDTO> {

    await this.checksQuizExistsById(id);

    await this.checksQuizExistsByTitulo(quiz.getTitulo());

    const updatedquiz = await quizRepository.updateQuiz(id, quiz);

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
}
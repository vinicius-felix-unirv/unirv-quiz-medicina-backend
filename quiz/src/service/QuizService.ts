
import { Service } from 'typedi';
import { BadRequestError } from '../exception/BadRequestError';
import { NotFoundError } from '../exception/NotFoundError';
import { QuizDTO } from '../model/QuizDTO';
import quizRepository from '../repository/quizRepository';
import cursoRepository from '../repository/cursoRepository';

@Service()
export class QuizService {

  async saveQuiz(quiz: QuizDTO): Promise<QuizDTO> {

    const quizExist = await quizRepository.getQuizByTitulo(quiz.getTitulo() ?? '');

    if(quizExist) throw new BadRequestError('Quiz ja existe');

    const cursoExists = await cursoRepository.getCursoById(quiz.getCursoId());

    if(!cursoExists) throw new NotFoundError('Curso nao encontrado');

    const newQuiz = await quizRepository.createQuiz(quiz);

    return new QuizDTO(newQuiz);
  }

  async updateQuiz(id: number, quiz: QuizDTO): Promise<QuizDTO> {

    const quizExist = await quizRepository.getQuizById(id);

    if (quizExist == null) throw new NotFoundError('Quiz not found');

    const descricaoRegistered = await quizRepository.getQuizByTitulo(quiz.getTitulo() ?? '');

    if (descricaoRegistered != null) throw new BadRequestError('quiz already exists');

    const updatedquiz = await quizRepository.updateQuiz(id, quiz);

    return new QuizDTO(updatedquiz);
  }

  async getAllQuiz(skip: number, take: number): Promise<QuizDTO[]> {

    const quizs = await quizRepository.getAllQuiz(skip, take);

    const quizsDTOs = quizs.map((quiz) => new QuizDTO(quiz));

    return quizsDTOs;
  }

  async getAllQuizByCurosId(skip: number, take: number, cursoId: number): Promise<QuizDTO[]> {

    const quizs = await quizRepository.getAllQuizByCursoId(skip, take, cursoId);

    const quizsDTOs = quizs.map((quiz) => new QuizDTO(quiz));

    return quizsDTOs;
  }

  async getQuizById(id: number): Promise<QuizDTO> {

    const quizExist = await quizRepository.getQuizById(id);

    if (quizExist == null) throw new NotFoundError('quiz not found');

    return new QuizDTO(quizExist);
  }
}
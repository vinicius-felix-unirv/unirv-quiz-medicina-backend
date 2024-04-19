import { quiz } from '@prisma/client';
import { prisma } from '../db/quizClientPrisma';
import { QuizDTO } from './../model/QuizDTO';

export default {

  async getQuizByTituloAndCurso(_titulo: string, _cursoid: number): Promise<quiz> {

    const quiz = await prisma.quiz.findFirst({ 
      where: { 
        titulo: _titulo, 
        cursoid: _cursoid
      } 
    });

    return quiz!;
  },

  async getQuizById(id: number): Promise<quiz> {

    const quiz = await prisma.quiz.findFirst({ where: { id: id } });

    return quiz!;
  },

  async createQuiz(quiz: QuizDTO): Promise<quiz> {

    const newQuiz = await prisma.quiz.create({ 
      data: { 
        titulo: quiz.getTitulo(),
        cursoid: quiz.getCursoId(),
        imagem: quiz.getImagem()
      } });

    return newQuiz;
  },

  async updateQuiz(id: number, quiz: QuizDTO): Promise<quiz> {

    const updatedQuiz = await prisma.quiz.update(
      {
        where: { id: id },
        data: {
          titulo: quiz.getTitulo(),
          imagem: quiz.getImagem()
        }
      }
    );

    return updatedQuiz;
  },

  async getAllQuiz(skip: number, take: number): Promise<quiz[]> {

    const quiz = await prisma.quiz.findMany({
      skip: skip,
      take: take
    });

    return quiz;
  },

  async getAllQuizByCursoId(skip: number, take: number, cursoId: number): Promise<quiz[]> {

    const quiz = await prisma.quiz.findMany({
      skip: skip,
      take: take,
      where: {
        cursoid: cursoId
      }
    });

    return quiz;
  },

  // async getAllQuizWithQuestion(): Promise<quiz[]> {

  //   const quiz = await prisma.quiz.findMany();

  //   let quizDto: IQuizDTO;

  //   quiz.map(async x => {
  //     const perguntas = await prisma.perguntas.findMany({ where: { id: x.id } });
  //     quizDto = new IQuizDTO(x);
  //     perguntas.map(perg => quizDto.setPerguntas(perg));

  //   });

  //   return quiz;
  // }

};
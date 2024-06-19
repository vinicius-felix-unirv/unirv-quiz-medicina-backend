import { quiz } from '@prisma/client';
import { prisma } from '../db/quizClientPrisma';
import { QuizDTO } from './../model/QuizDTO';

export default {

  async getQuizByTituloAndCurso(_titulo: string, _cursoid: number): Promise<quiz | null> {

    return await prisma.quiz.findFirst({ 
      where: { 
        titulo: _titulo, 
        cursoid: _cursoid
      } 
    });
  },

  async getQuizById(id: number): Promise<quiz | null> {

    return await prisma.quiz.findFirst({ where: { id: id } });

  },

  async createQuiz(quiz: QuizDTO): Promise<quiz> {

    return await prisma.quiz.create({ 
      data: { 
        titulo: quiz.getTitulo(),
        cursoid: quiz.getCursoId(),
        imagem: quiz.getImagem(),
        status: quiz.getStatus(),
        avaliativo: quiz.getAvaliativo(),
        usuarioid: quiz.getUsuarioId()
      } 
    });
  },

  async updateQuiz(id: number, quiz: QuizDTO): Promise<quiz> {

    return await prisma.quiz.update(
      {
        where: { id: id },
        data: {
          titulo: quiz.getTitulo(),
          imagem: quiz.getImagem()
        }
      }
    );

  },

  async getAllQuiz(skip: number, take: number): Promise<quiz[]> {

    return await prisma.quiz.findMany({
      skip: skip,
      take: take
    });
  },

  async getAllQuizByCursoId(skip: number, take: number, cursoId: number): Promise<quiz[]> {

    return await prisma.quiz.findMany({
      skip: skip,
      take: take,
      where: {
        cursoid: cursoId
      }
    });
  },

  async getAllQuizByUsuarioAndCursoId(skip: number, take: number, cursoId: number, usuarioId: number): Promise<quiz[]> {

    return await prisma.quiz.findMany({
      skip: skip,
      take: take,
      where: {
        cursoid: cursoId, 
        usuarioid: usuarioId
      }
    });
  },

  async getAllQuizAvaliativoByUsuarioAndCursoId(skip: number, take: number, cursoId: number, usuarioId: number): Promise<quiz[]> {

    return await prisma.quiz.findMany({
      skip: skip,
      take: take,
      where: {
        cursoid: cursoId, 
        avaliativo: true,
        usuarioid: usuarioId
      }
    });
  },

  async putStatusQuiz(quizId: number, quiz: QuizDTO): Promise<quiz> {

    return await prisma.quiz.update({
      where: {
        id: quizId
      },
      data: {
        status: quiz.getStatus()
      }
    });
  },

};
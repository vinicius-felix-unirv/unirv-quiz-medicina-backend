import { quiz } from '@prisma/client';
import { prisma } from '../db/quizClientPrisma';
import { QuizDTO, IQuizDTO } from './../model/QuizDTO';

export default {

    async getQuizByTitulo(_titulo: string): Promise<quiz> {

        const quiz = await prisma.quiz.findFirst({ where: { titulo: _titulo } });

        return quiz!;
    },

    async getQuizById(id: number): Promise<quiz> {

        const quiz = await prisma.quiz.findFirst({ where: { id: id } });

        return quiz!;
    },

    async createQuiz(quiz: QuizDTO): Promise<quiz> {

        const newQuiz = await prisma.quiz.create({ data: { titulo: quiz.getTitulo() } });

        return newQuiz;
    },

    async updateQuiz(id: number, quiz: QuizDTO): Promise<quiz> {

        const updatedQuiz = await prisma.quiz.update(
            {
                where: { id: id },
                data: {
                    titulo: quiz.getTitulo(),

                }
            }
        );

        return updatedQuiz;
    },

    async getAllQuiz(): Promise<quiz[]> {

        const quiz = await prisma.quiz.findMany();

        return quiz;
    },

    async getAllQuizWithQuestion(): Promise<quiz[]> {

        const quiz = await prisma.quiz.findMany();

        let quizDto: IQuizDTO;

        quiz.map(async x => {
            const perguntas = await prisma.perguntas.findMany({ where: { id: x.id } });
            quizDto = new IQuizDTO(x);
            perguntas.map(perg => quizDto.setPerguntas(perg));

        });

        return quiz;
    }

};
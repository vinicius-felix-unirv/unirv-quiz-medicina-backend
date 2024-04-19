import { quiz_avaliativo } from '@prisma/client';
import { QuizAvaliativoDTO } from '../model/QuizAvaliativoDTO';
import { prisma } from '../db/quizClientPrisma';


export default {

    async createQuizAvaliativo(quiz: QuizAvaliativoDTO): Promise<quiz_avaliativo> {
        
        const newQuiz = await prisma.quiz_avaliativo.create({
            data: {
                titulo: quiz.getTitulo(),
                imagem: quiz.getImagem(),
                usuarioid: quiz.getUsuariosId(),
                cursoid: quiz.getCursoId()
            }
        });

        return newQuiz;
    },

    async getQuizAvaliativoById(id: number): Promise<quiz_avaliativo | null> {

        const quiz = await prisma.quiz_avaliativo.findUnique({where: {id: id}});

        return quiz;
    },

    async getAllQuizAvaliativoByUsuarioAndCurso(usuarioId: number, cursoId: number, skip: number, take: number): Promise<quiz_avaliativo[]> {

        const quiz = await prisma.quiz_avaliativo.findMany({
            skip: skip,
            take: take,
            where: {
                usuarioid: usuarioId,
                cursoid: cursoId
            }
        });

        return quiz;
    },

    async getAllQuizAvaliativoByCursoId(cursoId: number, skip: number, take: number): Promise<quiz_avaliativo[]> {

        const quiz = await prisma.quiz_avaliativo.findMany({
            skip: skip,
            take: take,
            where: {
                cursoid: cursoId,
                status: true
            }
        });

        return quiz;
    },

    async getQuizAvaliativoByTituloAndCursoId(titulo: string, cursoId: number): Promise<quiz_avaliativo | null> {

        const quiz = await prisma.quiz_avaliativo.findFirst({
            where: {
                titulo: titulo,
                cursoid: cursoId
            }
        });

        return quiz;
    },


    async alterQuizAvaliativo(id: number, quiz: QuizAvaliativoDTO): Promise<quiz_avaliativo>{

        const updetedQuiz = await prisma.quiz_avaliativo.update({
            where: {id: id},
            data: {
                titulo: quiz.getTitulo(), 
                imagem: quiz.getImagem(),
            }
        });

        return updetedQuiz;
    },

    async alterStatusQuizAvaliativo(id: number, quiz: QuizAvaliativoDTO): Promise<quiz_avaliativo>{

        const updetedQuiz = await prisma.quiz_avaliativo.update({
            where: {id: id},
            data: {
                status: quiz.getStatus()
            }
        });

        return updetedQuiz;
    },


};
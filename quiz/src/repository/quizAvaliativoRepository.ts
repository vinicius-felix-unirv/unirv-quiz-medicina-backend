import { quiz_avaliativo } from '@prisma/client';
import { QuizAvaliativoDTO } from '../model/QuizAvaliativoDTO';
import { prisma } from '../db/quizClientPrisma';


export default {

    async createQuizAvaliativo(quiz: QuizAvaliativoDTO): Promise<quiz_avaliativo> {
        
        const newQuiz = await prisma.quiz_avaliativo.create({
            data: {
                titulo: quiz.getTitulo(),
                imagem: quiz.getImagem(),
                status: quiz.getStatus(),
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

    async getAllQuizAvaliativoByUserId(usuarioId: number): Promise<quiz_avaliativo[]> {

        const quiz = await prisma.quiz_avaliativo.findMany({
            where: {usuarioid: usuarioId}
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
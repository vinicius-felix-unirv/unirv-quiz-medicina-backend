import { quiz_avaliativo_usuario } from '@prisma/client';
import { prisma } from '../db/quizClientPrisma';
import { QuizAvaliativoUsuariosDTO } from '../model/QuizAvaliativoUsuariosDTO';


export default {

    async addingScoreQuizAvaliativo(data: QuizAvaliativoUsuariosDTO): Promise<quiz_avaliativo_usuario> {

        const newScore = await prisma.quiz_avaliativo_usuario.create({
            data: {
                quizid: data.getQuizId(),
                usuarioid: data.getUsuarioId(),
                pontuacao: data.getPontuacao(),
                horainicial: data.getHoraInicial(),
                horafinal: data.getHoraFinal()
            }
        });

        return newScore;
    },

    async getScore(quizId: number, usuarioId: number): Promise<quiz_avaliativo_usuario | null> {

        const scoreExists = await prisma.quiz_avaliativo_usuario.findFirst({
            where: {
                quizid: quizId,
                usuarioid: usuarioId
            }
        });

        return scoreExists;
    },

    async getScoreById(id: number): Promise<quiz_avaliativo_usuario | null> {

        const score = await prisma.quiz_avaliativo_usuario.findUnique({
            where: { id: id }
        });

        return score;
    },

    async getManyScoreByQuizAvaliativoId(quizid: number, skip: number, take: number): Promise<quiz_avaliativo_usuario[]> {

        const score = await prisma.quiz_avaliativo_usuario.findMany({
            skip: skip,
            take: take,
            where: { quizid: quizid }
        });

        return score;
    },
};
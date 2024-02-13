import { alternativas } from '@prisma/client';
import { prisma } from '../db/quizClientPrisma';
import { AlternativasDTO } from '../model/AlternativasDTO';


export default {

    async createAlternativa(alternativa: AlternativasDTO): Promise<alternativas>{
        
        const newAlternativa = await prisma.alternativas.create({
            data: {
                perguntasid: alternativa.getPerguntasId(),
                resposta: alternativa.getResposta(),
                pathimage: alternativa.getPathImage(),
                correta: alternativa.getCorreta()
            }
        });

        return newAlternativa;
    },

   
    async gatAllAternativasByPerguntaId(perguntaId: number): Promise<alternativas[]>{

        const alternativasByPergunta = await prisma.alternativas.findMany({
            where: { perguntasid: perguntaId}
        });

        return alternativasByPergunta;
    },

    async getAlternativaById(id: number): Promise<alternativas | null> {

        const alternativa = await prisma.alternativas.findUnique({where: {id: id}});

        return alternativa;
    },

    async updateAlternativa(alternativaId: number, alternativa: AlternativasDTO): Promise<alternativas> {

        const updateAlternativa = await prisma.alternativas.update({
            where: {id: alternativaId},
            data: { 
                resposta: alternativa.getResposta(),
                pathimage: alternativa.getPathImage(),
                correta: alternativa.getCorreta()
            }
        });

        return updateAlternativa;
    },

    async deleteAlternativa(alternativaId: number): Promise<void> {

        await prisma.alternativas.delete({where: {id: alternativaId}});
        
    }
};
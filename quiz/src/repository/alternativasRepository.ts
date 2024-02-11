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
    }
};
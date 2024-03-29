import { curso } from '@prisma/client';
import { prisma } from '../db/quizClientPrisma';

export default {

    async getCursoById(id: number): Promise<curso | null> {
        
        const curso = await prisma.curso.findFirst({
            where: { id: id }
        });

        return curso;
    }
};
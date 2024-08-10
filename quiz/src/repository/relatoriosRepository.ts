import { Prisma } from "@prisma/client";
import { prisma } from "../db/quizClientPrisma";

export default {

    async getRealatorio(): Promise<any>{

        const relatorio = await prisma.$queryRaw(
            Prisma.sql`WITH AgePeriods AS (
    SELECT
        u.sexo,
        u.cidade,
        CASE
            WHEN EXTRACT(HOUR FROM l.datalogin) BETWEEN 7 AND 11 THEN 'Manhã'
            WHEN EXTRACT(HOUR FROM l.datalogin) BETWEEN 12 AND 17 THEN 'Tarde'
            WHEN EXTRACT(HOUR FROM l.datalogin) BETWEEN 18 AND 23 THEN 'Noite'
            ELSE 'Outro'
        END AS periodo,
        DATE_PART('year', AGE(u.datanascimento)) AS idade
    FROM
        logs l
    JOIN
        usuarios u ON l.usuariosid = u.id
    WHERE
        l.datalogin BETWEEN '2024-08-01' AND '2024-08-31'
)
SELECT
    sexo,
    cidade,
    COUNT(*) FILTER (WHERE periodo = 'Manhã') AS quantidade_manha,
    COUNT(*) FILTER (WHERE periodo = 'Tarde') AS quantidade_tarde,
    COUNT(*) FILTER (WHERE periodo = 'Noite') AS quantidade_noite,
    COUNT(*) FILTER (WHERE idade BETWEEN 15 AND 19) AS idade_15_19,
    COUNT(*) FILTER (`
        );

        return relatorio;
    }
};
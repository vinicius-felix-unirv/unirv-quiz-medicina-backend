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
                CAST(COUNT(*) FILTER (WHERE periodo = 'Manhã') AS int) AS quantidade_manha,
                CAST(COUNT(*) FILTER (WHERE periodo = 'Tarde') AS int) AS quantidade_tarde,
                CAST(COUNT(*) FILTER (WHERE periodo = 'Noite') AS int) AS quantidade_noite,
                CAST(COUNT(*) FILTER (WHERE idade BETWEEN 15 AND 19) AS int) AS idade_15_19,
                CAST(COUNT(*) FILTER (WHERE idade BETWEEN 20 AND 24) AS int) AS idade_20_24,
                CAST(COUNT(*) FILTER (WHERE idade BETWEEN 25 AND 29) AS int) AS idade_25_29,
                CAST(COUNT(*) FILTER (WHERE idade BETWEEN 30 AND 34) AS int) AS idade_30_34,
                CAST(COUNT(*) FILTER (WHERE idade >= 35) AS int) AS idade_35_mais
            FROM
                AgePeriods
            WHERE
                periodo != 'Outro'
            GROUP BY
                sexo,
                cidade
            ORDER BY
                sexo,
                cidade;`
        );

        return relatorio;
    }
};
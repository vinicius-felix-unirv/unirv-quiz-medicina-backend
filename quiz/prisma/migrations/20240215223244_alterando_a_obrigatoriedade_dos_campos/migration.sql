/*
  Warnings:

  - Made the column `perguntasid` on table `alternativas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `curso` on table `campus` required. This step will fail if there are existing NULL values in that column.
  - Made the column `turma` on table `campus` required. This step will fail if there are existing NULL values in that column.
  - Made the column `periodo` on table `campus` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nome` on table `campus` required. This step will fail if there are existing NULL values in that column.
  - Made the column `usuariosid` on table `campus` required. This step will fail if there are existing NULL values in that column.
  - Made the column `descricao` on table `categorias` required. This step will fail if there are existing NULL values in that column.
  - Made the column `usuariosid` on table `logs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quizid` on table `perguntas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `usuariosid` on table `progressoperguntas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `perguntasid` on table `progressoperguntas` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "alternativas" ALTER COLUMN "perguntasid" SET NOT NULL;

-- AlterTable
ALTER TABLE "campus" ALTER COLUMN "curso" SET NOT NULL,
ALTER COLUMN "turma" SET NOT NULL,
ALTER COLUMN "periodo" SET NOT NULL,
ALTER COLUMN "nome" SET NOT NULL,
ALTER COLUMN "usuariosid" SET NOT NULL;

-- AlterTable
ALTER TABLE "categorias" ALTER COLUMN "descricao" SET NOT NULL;

-- AlterTable
ALTER TABLE "logs" ALTER COLUMN "usuariosid" SET NOT NULL;

-- AlterTable
ALTER TABLE "perguntas" ALTER COLUMN "quizid" SET NOT NULL;

-- AlterTable
ALTER TABLE "progressoperguntas" ALTER COLUMN "usuariosid" SET NOT NULL,
ALTER COLUMN "perguntasid" SET NOT NULL;

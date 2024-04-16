/*
  Warnings:

  - You are about to alter the column `resposta` on the `alternativas` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(255)`.
  - You are about to alter the column `pathimage` on the `alternativas` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `cursoid` on the `campus` table. All the data in the column will be lost.
  - You are about to drop the column `periodo` on the `campus` table. All the data in the column will be lost.
  - You are about to drop the column `turma` on the `campus` table. All the data in the column will be lost.
  - You are about to drop the column `usuariosid` on the `campus` table. All the data in the column will be lost.
  - Added the required column `imagem` to the `quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `campusid` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cursoid` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodo` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `turma` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "alternativas" DROP CONSTRAINT "alternativas_perguntasid_fkey";

-- DropForeignKey
ALTER TABLE "campus" DROP CONSTRAINT "campus_cursoid_fkey";

-- DropForeignKey
ALTER TABLE "campus" DROP CONSTRAINT "campus_usuariosid_fkey";

-- DropForeignKey
ALTER TABLE "categorias" DROP CONSTRAINT "categorias_cursoId_fkey";

-- DropForeignKey
ALTER TABLE "logs" DROP CONSTRAINT "logs_usuariosid_fkey";

-- DropForeignKey
ALTER TABLE "perguntas" DROP CONSTRAINT "perguntas_quizid_fkey";

-- DropForeignKey
ALTER TABLE "progressoperguntas" DROP CONSTRAINT "progressoperguntas_perguntasid_fkey";

-- DropForeignKey
ALTER TABLE "progressoperguntas" DROP CONSTRAINT "progressoperguntas_usuariosid_fkey";

-- DropForeignKey
ALTER TABLE "quiz" DROP CONSTRAINT "quiz_cursoid_fkey";

-- AlterTable
ALTER TABLE "alternativas" ALTER COLUMN "resposta" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "pathimage" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "campus" DROP COLUMN "cursoid",
DROP COLUMN "periodo",
DROP COLUMN "turma",
DROP COLUMN "usuariosid",
ALTER COLUMN "nomecampus" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "perguntas" ADD COLUMN     "quizavaliativoid" INTEGER,
ALTER COLUMN "quizid" DROP NOT NULL;

-- AlterTable
ALTER TABLE "quiz" ADD COLUMN     "imagem" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "campusid" INTEGER NOT NULL,
ADD COLUMN     "cursoid" INTEGER NOT NULL,
ADD COLUMN     "periodo" INTEGER NOT NULL,
ADD COLUMN     "turma" VARCHAR(255) NOT NULL,
ALTER COLUMN "role" SET DEFAULT 3;

-- CreateTable
CREATE TABLE "quiz_avaliativo" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(150) NOT NULL,
    "imagem" VARCHAR(255) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "usuarioid" INTEGER NOT NULL,
    "cursoid" INTEGER NOT NULL,

    CONSTRAINT "quiz_avaliativo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_avaliativo_usuario" (
    "id" SERIAL NOT NULL,
    "quizavaliativoid" INTEGER NOT NULL,
    "usuarioid" INTEGER NOT NULL,
    "pontuacao" INTEGER NOT NULL,
    "horainicial" DATE NOT NULL,
    "horafinal" DATE NOT NULL,

    CONSTRAINT "quiz_avaliativo_usuario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "alternativas" ADD CONSTRAINT "alternativas_perguntasid_fkey" FOREIGN KEY ("perguntasid") REFERENCES "perguntas"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "categorias" ADD CONSTRAINT "categorias_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "curso"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_usuariosid_fkey" FOREIGN KEY ("usuariosid") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "perguntas" ADD CONSTRAINT "perguntas_quizid_fkey" FOREIGN KEY ("quizid") REFERENCES "quiz"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "perguntas" ADD CONSTRAINT "perguntas_quizavaliativoid_fkey" FOREIGN KEY ("quizavaliativoid") REFERENCES "quiz_avaliativo"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "progressoperguntas" ADD CONSTRAINT "progressoperguntas_perguntasid_fkey" FOREIGN KEY ("perguntasid") REFERENCES "perguntas"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "progressoperguntas" ADD CONSTRAINT "progressoperguntas_usuariosid_fkey" FOREIGN KEY ("usuariosid") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "quiz" ADD CONSTRAINT "quiz_cursoid_fkey" FOREIGN KEY ("cursoid") REFERENCES "curso"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "quiz_avaliativo" ADD CONSTRAINT "quiz_avaliativo_usuarioid_fkey" FOREIGN KEY ("usuarioid") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "quiz_avaliativo" ADD CONSTRAINT "quiz_avaliativo_cursoid_fkey" FOREIGN KEY ("cursoid") REFERENCES "curso"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "quiz_avaliativo_usuario" ADD CONSTRAINT "quiz_avaliativo_usuario_quizavaliativoid_fkey" FOREIGN KEY ("quizavaliativoid") REFERENCES "quiz_avaliativo"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "quiz_avaliativo_usuario" ADD CONSTRAINT "quiz_avaliativo_usuario_usuarioid_fkey" FOREIGN KEY ("usuarioid") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_cursoid_fkey" FOREIGN KEY ("cursoid") REFERENCES "curso"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_campusid_fkey" FOREIGN KEY ("campusid") REFERENCES "campus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

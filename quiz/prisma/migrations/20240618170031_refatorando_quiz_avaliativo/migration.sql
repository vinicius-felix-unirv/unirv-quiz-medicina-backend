/*
  Warnings:

  - You are about to drop the column `quizavaliativoid` on the `perguntas` table. All the data in the column will be lost.
  - You are about to drop the column `quizavaliativoid` on the `quiz_avaliativo_usuario` table. All the data in the column will be lost.
  - You are about to drop the `quiz_avaliativo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `usuarioid` to the `quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quizid` to the `quiz_avaliativo_usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "perguntas" DROP CONSTRAINT "perguntas_quizavaliativoid_fkey";

-- DropForeignKey
ALTER TABLE "quiz_avaliativo" DROP CONSTRAINT "quiz_avaliativo_cursoid_fkey";

-- DropForeignKey
ALTER TABLE "quiz_avaliativo" DROP CONSTRAINT "quiz_avaliativo_usuarioid_fkey";

-- DropForeignKey
ALTER TABLE "quiz_avaliativo_usuario" DROP CONSTRAINT "quiz_avaliativo_usuario_quizavaliativoid_fkey";

-- AlterTable
ALTER TABLE "perguntas" DROP COLUMN "quizavaliativoid";

-- AlterTable
ALTER TABLE "quiz" ADD COLUMN     "avaliativo" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "usuarioid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "quiz_avaliativo_usuario" DROP COLUMN "quizavaliativoid",
ADD COLUMN     "quizid" INTEGER NOT NULL;

-- DropTable
DROP TABLE "quiz_avaliativo";

-- AddForeignKey
ALTER TABLE "quiz" ADD CONSTRAINT "quiz_usuarioid_fkey" FOREIGN KEY ("usuarioid") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "quiz_avaliativo_usuario" ADD CONSTRAINT "quiz_avaliativo_usuario_quizid_fkey" FOREIGN KEY ("quizid") REFERENCES "quiz"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

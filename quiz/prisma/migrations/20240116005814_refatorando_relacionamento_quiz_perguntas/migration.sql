/*
  Warnings:

  - You are about to drop the column `perguntaid` on the `quiz` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "quiz" DROP CONSTRAINT "quiz_perguntaid_fkey";

-- AlterTable
ALTER TABLE "perguntas" ADD COLUMN     "quizid" INTEGER;

-- AlterTable
ALTER TABLE "quiz" DROP COLUMN "perguntaid";

-- AddForeignKey
ALTER TABLE "perguntas" ADD CONSTRAINT "perguntas_quizid_fkey" FOREIGN KEY ("quizid") REFERENCES "quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

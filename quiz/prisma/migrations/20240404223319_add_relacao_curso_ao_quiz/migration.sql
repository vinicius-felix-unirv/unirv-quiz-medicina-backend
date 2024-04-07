/*
  Warnings:

  - Added the required column `cursoid` to the `quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "quiz" ADD COLUMN     "cursoid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "usuarios" ALTER COLUMN "pontuacao" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "quiz" ADD CONSTRAINT "quiz_cursoid_fkey" FOREIGN KEY ("cursoid") REFERENCES "curso"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

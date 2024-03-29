/*
  Warnings:

  - You are about to drop the column `cursoId` on the `campus` table. All the data in the column will be lost.
  - Added the required column `cursoid` to the `campus` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "campus" DROP CONSTRAINT "campus_cursoId_fkey";

-- AlterTable
ALTER TABLE "campus" DROP COLUMN "cursoId",
ADD COLUMN     "cursoid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "campus" ADD CONSTRAINT "campus_cursoid_fkey" FOREIGN KEY ("cursoid") REFERENCES "curso"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

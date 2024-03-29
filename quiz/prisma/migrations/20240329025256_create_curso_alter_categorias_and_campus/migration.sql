/*
  Warnings:

  - You are about to drop the column `curso` on the `campus` table. All the data in the column will be lost.
  - Added the required column `cursoId` to the `campus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cursoId` to the `categorias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagem` to the `categorias` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "campus" DROP COLUMN "curso",
ADD COLUMN     "cursoId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "categorias" ADD COLUMN     "cursoId" INTEGER NOT NULL,
ADD COLUMN     "imagem" VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE "curso" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "imagem" VARCHAR(255) NOT NULL,

    CONSTRAINT "curso_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "campus" ADD CONSTRAINT "campus_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "curso"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "categorias" ADD CONSTRAINT "categorias_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "curso"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

/*
  Warnings:

  - Added the required column `tempo` to the `perguntasnivel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "perguntasnivel" ADD COLUMN     "tempo" INTEGER NOT NULL;

/*
  Warnings:

  - Added the required column `cidade` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "cidade" VARCHAR(255) NOT NULL;

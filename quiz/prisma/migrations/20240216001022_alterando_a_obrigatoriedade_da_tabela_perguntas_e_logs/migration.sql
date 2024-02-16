/*
  Warnings:

  - Made the column `datalogin` on table `logs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `categoriasid` on table `perguntas` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "logs" ALTER COLUMN "datalogin" SET NOT NULL;

-- AlterTable
ALTER TABLE "perguntas" ALTER COLUMN "categoriasid" SET NOT NULL;

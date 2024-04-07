/*
  Warnings:

  - You are about to drop the column `nome` on the `campus` table. All the data in the column will be lost.
  - Added the required column `nomecampus` to the `campus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "campus" DROP COLUMN "nome",
ADD COLUMN     "nomecampus" VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE "usuarios" ALTER COLUMN "role" SET DEFAULT 2;

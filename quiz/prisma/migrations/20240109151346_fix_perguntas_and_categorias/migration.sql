/*
  Warnings:

  - You are about to drop the column `nivel` on the `perguntas` table. All the data in the column will be lost.
  - You are about to drop the column `categoriasid` on the `perguntasnivel` table. All the data in the column will be lost.
  - Added the required column `perguntasnivelid` to the `perguntas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "perguntasnivel" DROP CONSTRAINT "perguntasnivel_categoriasid_fkey";

-- AlterTable
ALTER TABLE "perguntas" DROP COLUMN "nivel",
ADD COLUMN     "categoriasid" INTEGER,
ADD COLUMN     "perguntasnivelid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "perguntasnivel" DROP COLUMN "categoriasid";

-- AddForeignKey
ALTER TABLE "perguntas" ADD CONSTRAINT "perguntas_categoriasid_fkey" FOREIGN KEY ("categoriasid") REFERENCES "categorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "perguntas" ADD CONSTRAINT "perguntas_perguntasnivelid_fkey" FOREIGN KEY ("perguntasnivelid") REFERENCES "perguntasnivel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

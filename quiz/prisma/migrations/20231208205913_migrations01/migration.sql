-- AlterTable
ALTER TABLE "categorias" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "perguntas" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

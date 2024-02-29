/*
  Warnings:

  - Added the required column `iconMenu` to the `menu` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "menu_urlMenu_key";

-- AlterTable
ALTER TABLE "menu" ADD COLUMN     "iconMenu" VARCHAR(255) NOT NULL;

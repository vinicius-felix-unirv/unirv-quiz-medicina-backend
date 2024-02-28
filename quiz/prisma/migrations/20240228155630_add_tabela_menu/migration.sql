-- CreateTable
CREATE TABLE "menu" (
    "id" SERIAL NOT NULL,
    "urlMenu" VARCHAR(255) NOT NULL,
    "role" INTEGER NOT NULL,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "menu_urlMenu_key" ON "menu"("urlMenu");

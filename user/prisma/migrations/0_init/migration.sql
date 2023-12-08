-- CreateTable
CREATE TABLE "alternativas" (
    "id" SERIAL NOT NULL,
    "perguntasid" INTEGER,
    "resposta" VARCHAR,
    "pathimage" TEXT,
    "correta" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "alternativas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campus" (
    "id" SERIAL NOT NULL,
    "curso" VARCHAR(255),
    "turma" VARCHAR(255),
    "periodo" INTEGER,
    "nome" VARCHAR(100),
    "usuariosid" INTEGER,

    CONSTRAINT "campus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(25),

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logs" (
    "id" SERIAL NOT NULL,
    "datalogin" DATE NOT NULL,
    "usuariosid" INTEGER,
    "descricao" VARCHAR(100) NOT NULL,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perguntas" (
    "id" SERIAL NOT NULL,
    "conteudo" TEXT,
    "nivel" INTEGER NOT NULL,
    "tempo" INTEGER NOT NULL,
    "pathimage" TEXT,

    CONSTRAINT "perguntas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perguntasnivel" (
    "id" SERIAL NOT NULL,
    "nivel" INTEGER NOT NULL,
    "pontuacao" INTEGER NOT NULL,
    "categoriasid" INTEGER,

    CONSTRAINT "perguntasnivel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "progressoperguntas" (
    "id" SERIAL NOT NULL,
    "usuariosid" INTEGER,
    "perguntasid" INTEGER,

    CONSTRAINT "progressoperguntas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(150) NOT NULL,
    "perguntaid" INTEGER,

    CONSTRAINT "quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "telefone" VARCHAR(15) NOT NULL,
    "sexo" INTEGER NOT NULL,
    "datanascimento" DATE NOT NULL,
    "role" INTEGER NOT NULL,
    "uf" VARCHAR(2) NOT NULL,
    "campus" INTEGER,
    "foto" VARCHAR(255) NOT NULL,
    "pontuacao" INTEGER NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "alternativas" ADD CONSTRAINT "alternativas_perguntasid_fkey" FOREIGN KEY ("perguntasid") REFERENCES "perguntas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "campus" ADD CONSTRAINT "campus_usuariosid_fkey" FOREIGN KEY ("usuariosid") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_usuariosid_fkey" FOREIGN KEY ("usuariosid") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "perguntasnivel" ADD CONSTRAINT "perguntasnivel_categoriasid_fkey" FOREIGN KEY ("categoriasid") REFERENCES "categorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "progressoperguntas" ADD CONSTRAINT "progressoperguntas_perguntasid_fkey" FOREIGN KEY ("perguntasid") REFERENCES "perguntas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "progressoperguntas" ADD CONSTRAINT "progressoperguntas_usuariosid_fkey" FOREIGN KEY ("usuariosid") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "quiz" ADD CONSTRAINT "quiz_perguntaid_fkey" FOREIGN KEY ("perguntaid") REFERENCES "perguntas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;


-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "continentes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "continentes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paises" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "populacao" BIGINT,
    "idioma_oficial" TEXT,
    "moeda" TEXT,
    "id_continente" INTEGER NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "paises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cidades" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "populacao" BIGINT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "id_pais" INTEGER NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cidades_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "continentes_nome_key" ON "continentes"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "paises_nome_id_continente_key" ON "paises"("nome", "id_continente");

-- CreateIndex
CREATE UNIQUE INDEX "cidades_nome_id_pais_key" ON "cidades"("nome", "id_pais");

-- AddForeignKey
ALTER TABLE "paises" ADD CONSTRAINT "paises_id_continente_fkey" FOREIGN KEY ("id_continente") REFERENCES "continentes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cidades" ADD CONSTRAINT "cidades_id_pais_fkey" FOREIGN KEY ("id_pais") REFERENCES "paises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

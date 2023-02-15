-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "peperoni" INTEGER NOT NULL,
    "branco" INTEGER NOT NULL,
    "alldressed" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IngredientCosts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cost" TEXT NOT NULL,
    "unit" TEXT NOT NULL,

    CONSTRAINT "IngredientCosts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Price" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailySales" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "peperoni" INTEGER NOT NULL,
    "branco" INTEGER NOT NULL,
    "alldressed" INTEGER NOT NULL,

    CONSTRAINT "DailySales_pkey" PRIMARY KEY ("id")
);

/*
  Warnings:

  - You are about to drop the `DailySales` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "DailySales";

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "peperoni" INTEGER NOT NULL,
    "branco" INTEGER NOT NULL,
    "alldressed" INTEGER NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

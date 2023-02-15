/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `DailySales` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DailySales_date_key" ON "DailySales"("date");

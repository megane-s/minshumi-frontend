/*
  Warnings:

  - A unique constraint covering the columns `[pinnedBusinessCardId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "pinnedBusinessCardId" STRING;

-- CreateIndex
CREATE UNIQUE INDEX "User_pinnedBusinessCardId_key" ON "User"("pinnedBusinessCardId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_pinnedBusinessCardId_fkey" FOREIGN KEY ("pinnedBusinessCardId") REFERENCES "BusinessCard"("businessCardId") ON DELETE SET NULL ON UPDATE CASCADE;

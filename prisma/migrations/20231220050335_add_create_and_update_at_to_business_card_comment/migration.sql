/*
  Warnings:

  - Added the required column `updateAt` to the `BusinessCardComment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BusinessCardComment" ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "BusinessCardComment" ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

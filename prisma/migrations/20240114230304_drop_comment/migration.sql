/*
  Warnings:

  - You are about to drop the `BusinessCardComment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BusinessCardComment" DROP CONSTRAINT "BusinessCardComment_businessCardId_fkey";

-- DropForeignKey
ALTER TABLE "BusinessCardComment" DROP CONSTRAINT "BusinessCardComment_commentUserId_fkey";

-- DropTable
DROP TABLE "BusinessCardComment";

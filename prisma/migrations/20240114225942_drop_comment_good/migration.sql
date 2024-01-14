/*
  Warnings:

  - You are about to drop the `BusinessCardCommentGoodUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BusinessCardCommentGoodUser" DROP CONSTRAINT "BusinessCardCommentGoodUser_commentId_fkey";

-- DropForeignKey
ALTER TABLE "BusinessCardCommentGoodUser" DROP CONSTRAINT "BusinessCardCommentGoodUser_goodUserId_fkey";

-- DropTable
DROP TABLE "BusinessCardCommentGoodUser";

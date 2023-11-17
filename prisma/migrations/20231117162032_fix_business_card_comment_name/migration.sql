/*
  Warnings:

  - You are about to drop the `ProfileComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProfileCommentGoodUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProfileComment" DROP CONSTRAINT "ProfileComment_businessCardId_fkey";

-- DropForeignKey
ALTER TABLE "ProfileCommentGoodUser" DROP CONSTRAINT "ProfileCommentGoodUser_commentId_fkey";

-- DropForeignKey
ALTER TABLE "ProfileCommentGoodUser" DROP CONSTRAINT "ProfileCommentGoodUser_goodUserId_fkey";

-- DropTable
DROP TABLE "ProfileComment";

-- DropTable
DROP TABLE "ProfileCommentGoodUser";

-- CreateTable
CREATE TABLE "BusinessCardComment" (
    "commentId" STRING NOT NULL,
    "businessCardId" STRING NOT NULL,
    "content" STRING NOT NULL,

    CONSTRAINT "BusinessCardComment_pkey" PRIMARY KEY ("commentId")
);

-- CreateTable
CREATE TABLE "BusinessCardCommentGoodUser" (
    "commentId" STRING NOT NULL,
    "goodUserId" STRING NOT NULL,

    CONSTRAINT "BusinessCardCommentGoodUser_pkey" PRIMARY KEY ("commentId","goodUserId")
);

-- AddForeignKey
ALTER TABLE "BusinessCardComment" ADD CONSTRAINT "BusinessCardComment_businessCardId_fkey" FOREIGN KEY ("businessCardId") REFERENCES "BusinessCard"("businessCardId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCardCommentGoodUser" ADD CONSTRAINT "BusinessCardCommentGoodUser_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "BusinessCardComment"("commentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCardCommentGoodUser" ADD CONSTRAINT "BusinessCardCommentGoodUser_goodUserId_fkey" FOREIGN KEY ("goodUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

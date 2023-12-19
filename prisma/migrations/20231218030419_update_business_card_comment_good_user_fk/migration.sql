-- DropForeignKey
ALTER TABLE "BusinessCardCommentGoodUser" DROP CONSTRAINT "BusinessCardCommentGoodUser_commentId_fkey";

-- AddForeignKey
ALTER TABLE "BusinessCardCommentGoodUser" ADD CONSTRAINT "BusinessCardCommentGoodUser_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "BusinessCardComment"("commentId") ON DELETE CASCADE ON UPDATE CASCADE;

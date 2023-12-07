/*
  Warnings:

  - Added the required column `commentUserId` to the `BusinessCardComment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BusinessCardComment" ADD COLUMN     "commentUserId" STRING NOT NULL;

-- AddForeignKey
ALTER TABLE "BusinessCardComment" ADD CONSTRAINT "BusinessCardComment_commentUserId_fkey" FOREIGN KEY ("commentUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

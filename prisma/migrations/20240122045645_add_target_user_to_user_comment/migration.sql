/*
  Warnings:

  - Added the required column `targetUserId` to the `UserComment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserComment" ADD COLUMN     "targetUserId" STRING NOT NULL;

-- AddForeignKey
ALTER TABLE "UserComment" ADD CONSTRAINT "UserComment_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

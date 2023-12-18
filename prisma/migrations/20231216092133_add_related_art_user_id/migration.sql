/*
  Warnings:

  - Added the required column `userId` to the `RelatedArt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RelatedArt" ADD COLUMN     "artArtId" STRING;
ALTER TABLE "RelatedArt" ADD COLUMN     "userId" STRING NOT NULL;

-- AddForeignKey
ALTER TABLE "RelatedArt" ADD CONSTRAINT "RelatedArt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedArt" ADD CONSTRAINT "RelatedArt_artId_fkey" FOREIGN KEY ("artId") REFERENCES "Art"("artId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedArt" ADD CONSTRAINT "RelatedArt_artArtId_fkey" FOREIGN KEY ("artArtId") REFERENCES "Art"("artId") ON DELETE SET NULL ON UPDATE CASCADE;

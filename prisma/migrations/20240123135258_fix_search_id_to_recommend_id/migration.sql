/*
  Warnings:

  - You are about to drop the column `searchId` on the `Art` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "RelatedArt_artId_relatedArtId_key";

-- AlterTable
ALTER TABLE "Art" DROP COLUMN "searchId";
ALTER TABLE "Art" ADD COLUMN     "recommendId" INT4;

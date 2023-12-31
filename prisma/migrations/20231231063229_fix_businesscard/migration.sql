-- DropForeignKey
ALTER TABLE "BusinessCardLikeArt" DROP CONSTRAINT "BusinessCardLikeArt_likeArtTitle_fkey";

-- AlterTable
ALTER TABLE "BusinessCardLikeArt" ADD COLUMN     "artArtId" STRING;

-- AddForeignKey
ALTER TABLE "BusinessCardLikeArt" ADD CONSTRAINT "BusinessCardLikeArt_artArtId_fkey" FOREIGN KEY ("artArtId") REFERENCES "Art"("artId") ON DELETE SET NULL ON UPDATE CASCADE;

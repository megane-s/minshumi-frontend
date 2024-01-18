-- DropForeignKey
ALTER TABLE "ArtAppeal" DROP CONSTRAINT "ArtAppeal_artId_fkey";

-- DropForeignKey
ALTER TABLE "ArtGoodUser" DROP CONSTRAINT "ArtGoodUser_artArtId_fkey";

-- DropForeignKey
ALTER TABLE "ArtTag" DROP CONSTRAINT "ArtTag_artId_fkey";

-- DropForeignKey
ALTER TABLE "BookmarkArt" DROP CONSTRAINT "BookmarkArt_artId_fkey";

-- DropForeignKey
ALTER TABLE "BusinessCardGoodUser" DROP CONSTRAINT "BusinessCardGoodUser_businessCardId_fkey";

-- DropForeignKey
ALTER TABLE "BusinessCardInterestTag" DROP CONSTRAINT "BusinessCardInterestTag_businessCardId_fkey";

-- DropForeignKey
ALTER TABLE "BusinessCardLikeArt" DROP CONSTRAINT "BusinessCardLikeArt_artArtId_fkey";

-- DropForeignKey
ALTER TABLE "BusinessCardLikeArt" DROP CONSTRAINT "BusinessCardLikeArt_businessCardId_fkey";

-- DropForeignKey
ALTER TABLE "RelatedArt" DROP CONSTRAINT "RelatedArt_artId_fkey";

-- DropForeignKey
ALTER TABLE "RelatedArt" DROP CONSTRAINT "RelatedArt_relatedArtId_fkey";

-- DropForeignKey
ALTER TABLE "WatchingArt" DROP CONSTRAINT "WatchingArt_artId_fkey";

-- AlterTable
ALTER TABLE "Art" ALTER COLUMN "searchId" SET DEFAULT NULL;

-- AddForeignKey
ALTER TABLE "RelatedArt" ADD CONSTRAINT "RelatedArt_artId_fkey" FOREIGN KEY ("artId") REFERENCES "Art"("artId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedArt" ADD CONSTRAINT "RelatedArt_relatedArtId_fkey" FOREIGN KEY ("relatedArtId") REFERENCES "Art"("artId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtTag" ADD CONSTRAINT "ArtTag_artId_fkey" FOREIGN KEY ("artId") REFERENCES "Art"("artId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtGoodUser" ADD CONSTRAINT "ArtGoodUser_artArtId_fkey" FOREIGN KEY ("artArtId") REFERENCES "Art"("artId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtAppeal" ADD CONSTRAINT "ArtAppeal_artId_fkey" FOREIGN KEY ("artId") REFERENCES "Art"("artId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchingArt" ADD CONSTRAINT "WatchingArt_artId_fkey" FOREIGN KEY ("artId") REFERENCES "Art"("artId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookmarkArt" ADD CONSTRAINT "BookmarkArt_artId_fkey" FOREIGN KEY ("artId") REFERENCES "Art"("artId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCardLikeArt" ADD CONSTRAINT "BusinessCardLikeArt_businessCardId_fkey" FOREIGN KEY ("businessCardId") REFERENCES "BusinessCard"("businessCardId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCardLikeArt" ADD CONSTRAINT "BusinessCardLikeArt_artArtId_fkey" FOREIGN KEY ("artArtId") REFERENCES "Art"("artId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCardInterestTag" ADD CONSTRAINT "BusinessCardInterestTag_businessCardId_fkey" FOREIGN KEY ("businessCardId") REFERENCES "BusinessCard"("businessCardId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCardGoodUser" ADD CONSTRAINT "BusinessCardGoodUser_businessCardId_fkey" FOREIGN KEY ("businessCardId") REFERENCES "BusinessCard"("businessCardId") ON DELETE CASCADE ON UPDATE CASCADE;

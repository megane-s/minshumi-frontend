-- AlterTable
ALTER TABLE "Art" ALTER COLUMN "searchId" SET DEFAULT NULL;

-- CreateTable
CREATE TABLE "ArtEditHistory" (
    "artId" STRING NOT NULL,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateUserId" STRING,

    CONSTRAINT "ArtEditHistory_pkey" PRIMARY KEY ("artId","updateAt")
);

-- CreateTable
CREATE TABLE "ArtTitleEditHistory" (
    "artId" STRING NOT NULL,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" STRING NOT NULL,

    CONSTRAINT "ArtTitleEditHistory_pkey" PRIMARY KEY ("artId","updateAt")
);

-- CreateTable
CREATE TABLE "ArtImageUrlEditHistory" (
    "artId" STRING NOT NULL,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imageUrl" STRING NOT NULL,

    CONSTRAINT "ArtImageUrlEditHistory_pkey" PRIMARY KEY ("artId","updateAt")
);

-- CreateTable
CREATE TABLE "ArtDescriptionEditHistory" (
    "artId" STRING NOT NULL,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" STRING NOT NULL,

    CONSTRAINT "ArtDescriptionEditHistory_pkey" PRIMARY KEY ("artId","updateAt")
);

-- RenameForeignKey
ALTER TABLE "BusinessCardLikeArt" RENAME CONSTRAINT "_BusinessCardLikeArt_artArtId_fkey" TO "BusinessCardLikeArt_artArtId_fkey";

-- RenameForeignKey
ALTER TABLE "RelatedArt" RENAME CONSTRAINT "_RelatedArt_artId_fkey" TO "RelatedArt_artId_fkey";

-- AddForeignKey
ALTER TABLE "ArtEditHistory" ADD CONSTRAINT "ArtEditHistory_artId_fkey" FOREIGN KEY ("artId") REFERENCES "Art"("artId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtEditHistory" ADD CONSTRAINT "ArtEditHistory_updateUserId_fkey" FOREIGN KEY ("updateUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtTitleEditHistory" ADD CONSTRAINT "ArtTitleEditHistory_artId_updateAt_fkey" FOREIGN KEY ("artId", "updateAt") REFERENCES "ArtEditHistory"("artId", "updateAt") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtImageUrlEditHistory" ADD CONSTRAINT "ArtImageUrlEditHistory_artId_updateAt_fkey" FOREIGN KEY ("artId", "updateAt") REFERENCES "ArtEditHistory"("artId", "updateAt") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtDescriptionEditHistory" ADD CONSTRAINT "ArtDescriptionEditHistory_artId_updateAt_fkey" FOREIGN KEY ("artId", "updateAt") REFERENCES "ArtEditHistory"("artId", "updateAt") ON DELETE RESTRICT ON UPDATE CASCADE;

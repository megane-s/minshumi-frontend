-- AlterTable
ALTER TABLE "Art" ALTER COLUMN "searchId" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "ArtDescriptionEditHistory" ALTER COLUMN "updateAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "ArtImageUrlEditHistory" ALTER COLUMN "updateAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "ArtTitleEditHistory" ALTER COLUMN "updateAt" DROP DEFAULT;

-- CreateTable
CREATE TABLE "ArtTagsEditHistory" (
    "artId" STRING NOT NULL,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "tags" STRING[],

    CONSTRAINT "ArtTagsEditHistory_pkey" PRIMARY KEY ("artId","updateAt")
);

-- AddForeignKey
ALTER TABLE "ArtTagsEditHistory" ADD CONSTRAINT "ArtTagsEditHistory_artId_updateAt_fkey" FOREIGN KEY ("artId", "updateAt") REFERENCES "ArtEditHistory"("artId", "updateAt") ON DELETE RESTRICT ON UPDATE CASCADE;

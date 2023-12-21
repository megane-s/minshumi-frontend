-- CreateEnum
CREATE TYPE "RelatedArtType" AS ENUM ('PREV', 'NEXT');

-- CreateEnum
CREATE TYPE "ArtTagType" AS ENUM ('MEDIA', 'GENRE', 'OTHER');

-- AlterTable
ALTER TABLE "ArtTag" ADD COLUMN     "tagType" "ArtTagType" NOT NULL DEFAULT 'OTHER';

-- AlterTable
ALTER TABLE "RelatedArt" ADD COLUMN     "type" "RelatedArtType" NOT NULL DEFAULT 'PREV';

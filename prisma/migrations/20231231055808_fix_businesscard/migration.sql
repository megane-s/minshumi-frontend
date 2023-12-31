/*
  Warnings:

  - You are about to drop the `BusinessCardLikeArt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BusinessCardRank` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `icon` to the `BusinessCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `BusinessCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rank` to the `BusinessCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `themeColor` to the `BusinessCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `BusinessCard` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BusinessCardLikeArt" DROP CONSTRAINT "BusinessCardLikeArt_businessCardId_fkey";

-- DropForeignKey
ALTER TABLE "BusinessCardLikeArt" DROP CONSTRAINT "BusinessCardLikeArt_likeArtId_fkey";

-- AlterTable
ALTER TABLE "BusinessCard" ADD COLUMN     "icon" STRING NOT NULL;
ALTER TABLE "BusinessCard" ADD COLUMN     "name" STRING NOT NULL;
ALTER TABLE "BusinessCard" ADD COLUMN     "rank" STRING NOT NULL;
ALTER TABLE "BusinessCard" ADD COLUMN     "themeColor" STRING NOT NULL;
ALTER TABLE "BusinessCard" ADD COLUMN     "type" STRING NOT NULL;

-- DropTable
DROP TABLE "BusinessCardLikeArt";

-- DropTable
DROP TABLE "BusinessCardRank";

-- CreateTable
CREATE TABLE "BusinessCardInterestTag" (
    "businessCardId" STRING NOT NULL,
    "tag" STRING NOT NULL,

    CONSTRAINT "BusinessCardInterestTag_pkey" PRIMARY KEY ("businessCardId","tag")
);

-- AddForeignKey
ALTER TABLE "BusinessCardInterestTag" ADD CONSTRAINT "BusinessCardInterestTag_businessCardId_fkey" FOREIGN KEY ("businessCardId") REFERENCES "BusinessCard"("businessCardId") ON DELETE RESTRICT ON UPDATE CASCADE;

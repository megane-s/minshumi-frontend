/*
  Warnings:

  - You are about to drop the column `bussinessCardId` on the `ProfileComment` table. All the data in the column will be lost.
  - You are about to drop the `BussinessCard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BussinessCardGoodUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BussinessCardLikeArt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BussinessCardRank` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `businessCardId` to the `ProfileComment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BussinessCard" DROP CONSTRAINT "BussinessCard_userId_fkey";

-- DropForeignKey
ALTER TABLE "BussinessCardGoodUser" DROP CONSTRAINT "BussinessCardGoodUser_bussinessCardId_fkey";

-- DropForeignKey
ALTER TABLE "BussinessCardGoodUser" DROP CONSTRAINT "BussinessCardGoodUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "BussinessCardLikeArt" DROP CONSTRAINT "BussinessCardLikeArt_bussinessCardId_fkey";

-- DropForeignKey
ALTER TABLE "BussinessCardLikeArt" DROP CONSTRAINT "BussinessCardLikeArt_likeArtId_fkey";

-- DropForeignKey
ALTER TABLE "ProfileComment" DROP CONSTRAINT "ProfileComment_bussinessCardId_fkey";

-- AlterTable
ALTER TABLE "ProfileComment" DROP COLUMN "bussinessCardId";
ALTER TABLE "ProfileComment" ADD COLUMN     "businessCardId" STRING NOT NULL;

-- DropTable
DROP TABLE "BussinessCard";

-- DropTable
DROP TABLE "BussinessCardGoodUser";

-- DropTable
DROP TABLE "BussinessCardLikeArt";

-- DropTable
DROP TABLE "BussinessCardRank";

-- CreateTable
CREATE TABLE "BusinessCard" (
    "businessCardId" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "backgroundImageUrl" STRING NOT NULL,
    "canComment" BOOL NOT NULL,

    CONSTRAINT "BusinessCard_pkey" PRIMARY KEY ("businessCardId")
);

-- CreateTable
CREATE TABLE "BusinessCardLikeArt" (
    "businessCardId" STRING NOT NULL,
    "likeArtId" STRING NOT NULL,

    CONSTRAINT "BusinessCardLikeArt_pkey" PRIMARY KEY ("businessCardId","likeArtId")
);

-- CreateTable
CREATE TABLE "BusinessCardRank" (
    "businessCardId" STRING NOT NULL,
    "rank" STRING NOT NULL,

    CONSTRAINT "BusinessCardRank_pkey" PRIMARY KEY ("businessCardId","rank")
);

-- CreateTable
CREATE TABLE "BusinessCardGoodUser" (
    "businessCardId" STRING NOT NULL,
    "userId" STRING NOT NULL,

    CONSTRAINT "BusinessCardGoodUser_pkey" PRIMARY KEY ("businessCardId","userId")
);

-- AddForeignKey
ALTER TABLE "BusinessCard" ADD CONSTRAINT "BusinessCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCardLikeArt" ADD CONSTRAINT "BusinessCardLikeArt_businessCardId_fkey" FOREIGN KEY ("businessCardId") REFERENCES "BusinessCard"("businessCardId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCardLikeArt" ADD CONSTRAINT "BusinessCardLikeArt_likeArtId_fkey" FOREIGN KEY ("likeArtId") REFERENCES "Art"("artId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileComment" ADD CONSTRAINT "ProfileComment_businessCardId_fkey" FOREIGN KEY ("businessCardId") REFERENCES "BusinessCard"("businessCardId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCardGoodUser" ADD CONSTRAINT "BusinessCardGoodUser_businessCardId_fkey" FOREIGN KEY ("businessCardId") REFERENCES "BusinessCard"("businessCardId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCardGoodUser" ADD CONSTRAINT "BusinessCardGoodUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `RecommendArt` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RecommendArt" DROP CONSTRAINT "RecommendArt_artId_fkey";

-- DropForeignKey
ALTER TABLE "RecommendArt" DROP CONSTRAINT "RecommendArt_userId_fkey";

-- DropTable
DROP TABLE "RecommendArt";

-- CreateTable
CREATE TABLE "ArtAppeal" (
    "userId" STRING NOT NULL,
    "artId" STRING NOT NULL,
    "likePoint" STRING NOT NULL,

    CONSTRAINT "ArtAppeal_pkey" PRIMARY KEY ("userId","artId")
);

-- AddForeignKey
ALTER TABLE "ArtAppeal" ADD CONSTRAINT "ArtAppeal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtAppeal" ADD CONSTRAINT "ArtAppeal_artId_fkey" FOREIGN KEY ("artId") REFERENCES "Art"("artId") ON DELETE RESTRICT ON UPDATE CASCADE;

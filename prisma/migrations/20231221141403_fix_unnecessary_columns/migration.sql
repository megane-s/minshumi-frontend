/*
  Warnings:

  - You are about to drop the column `artArtId` on the `RelatedArt` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "RelatedArt" DROP CONSTRAINT "RelatedArt_artArtId_fkey";

-- AlterTable
ALTER TABLE "RelatedArt" DROP COLUMN "artArtId";

/*
  Warnings:

  - Made the column `no` on table `BusinessCardLikeArt` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "BusinessCardLikeArt" ALTER COLUMN "no" SET NOT NULL;

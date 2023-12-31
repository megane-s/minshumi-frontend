/*
  Warnings:

  - You are about to drop the column `icon` on the `BusinessCard` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BusinessCard" DROP COLUMN "icon";
ALTER TABLE "BusinessCard" ALTER COLUMN "rank" DROP NOT NULL;

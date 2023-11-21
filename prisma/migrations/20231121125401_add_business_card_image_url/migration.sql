/*
  Warnings:

  - Added the required column `imageUrl` to the `BusinessCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BusinessCard" ADD COLUMN     "imageUrl" STRING NOT NULL;

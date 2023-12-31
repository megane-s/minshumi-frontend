-- CreateTable
CREATE TABLE "BusinessCardLikeArt" (
    "businessCardId" STRING NOT NULL,
    "likeArtTitle" STRING NOT NULL,

    CONSTRAINT "BusinessCardLikeArt_pkey" PRIMARY KEY ("businessCardId","likeArtTitle")
);

-- AddForeignKey
ALTER TABLE "BusinessCardLikeArt" ADD CONSTRAINT "BusinessCardLikeArt_businessCardId_fkey" FOREIGN KEY ("businessCardId") REFERENCES "BusinessCard"("businessCardId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCardLikeArt" ADD CONSTRAINT "BusinessCardLikeArt_likeArtTitle_fkey" FOREIGN KEY ("likeArtTitle") REFERENCES "Art"("artId") ON DELETE RESTRICT ON UPDATE CASCADE;

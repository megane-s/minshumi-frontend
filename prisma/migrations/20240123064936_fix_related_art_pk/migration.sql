-- AlterPrimaryKey
ALTER TABLE "RelatedArt" ALTER PRIMARY KEY USING COLUMNS ("userId", "artId", "relatedArtId");

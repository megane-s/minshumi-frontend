-- CreateTable
CREATE TABLE "Follower" (
    "userId" STRING NOT NULL,
    "followerId" STRING NOT NULL,

    CONSTRAINT "Follower_pkey" PRIMARY KEY ("userId","followerId")
);

-- CreateTable
CREATE TABLE "BlockUser" (
    "userId" STRING NOT NULL,
    "blockUserId" STRING NOT NULL,

    CONSTRAINT "BlockUser_pkey" PRIMARY KEY ("userId","blockUserId")
);

-- CreateTable
CREATE TABLE "UserRank" (
    "userId" STRING NOT NULL,
    "rank" STRING NOT NULL,

    CONSTRAINT "UserRank_pkey" PRIMARY KEY ("userId","rank")
);

-- CreateTable
CREATE TABLE "Art" (
    "artId" STRING NOT NULL,
    "title" STRING NOT NULL,
    "imageUrl" STRING NOT NULL,

    CONSTRAINT "Art_pkey" PRIMARY KEY ("artId")
);

-- CreateTable
CREATE TABLE "RelatedArt" (
    "artId" STRING NOT NULL,
    "relatedArtId" STRING NOT NULL,

    CONSTRAINT "RelatedArt_pkey" PRIMARY KEY ("artId","relatedArtId")
);

-- CreateTable
CREATE TABLE "ArtTag" (
    "artId" STRING NOT NULL,
    "tag" STRING NOT NULL,

    CONSTRAINT "ArtTag_pkey" PRIMARY KEY ("artId","tag")
);

-- CreateTable
CREATE TABLE "InterestTag" (
    "userId" STRING NOT NULL,
    "tag" STRING NOT NULL,

    CONSTRAINT "InterestTag_pkey" PRIMARY KEY ("userId","tag")
);

-- CreateTable
CREATE TABLE "ArtGoodUser" (
    "artId" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "artArtId" STRING NOT NULL,

    CONSTRAINT "ArtGoodUser_pkey" PRIMARY KEY ("artId","userId")
);

-- CreateTable
CREATE TABLE "RecommendArt" (
    "userId" STRING NOT NULL,
    "artId" STRING NOT NULL,
    "likePoint" STRING NOT NULL,

    CONSTRAINT "RecommendArt_pkey" PRIMARY KEY ("userId","artId")
);

-- CreateTable
CREATE TABLE "WatchingArt" (
    "userId" STRING NOT NULL,
    "artId" STRING NOT NULL,

    CONSTRAINT "WatchingArt_pkey" PRIMARY KEY ("userId","artId")
);

-- CreateTable
CREATE TABLE "BookmarkArt" (
    "userId" STRING NOT NULL,
    "artId" STRING NOT NULL,

    CONSTRAINT "BookmarkArt_pkey" PRIMARY KEY ("userId","artId")
);

-- CreateTable
CREATE TABLE "BussinessCard" (
    "bussinessCardId" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "backgroundImageUrl" STRING NOT NULL,
    "canComment" BOOL NOT NULL,

    CONSTRAINT "BussinessCard_pkey" PRIMARY KEY ("bussinessCardId")
);

-- CreateTable
CREATE TABLE "BussinessCardLikeArt" (
    "bussinessCardId" STRING NOT NULL,
    "likeArtId" STRING NOT NULL,

    CONSTRAINT "BussinessCardLikeArt_pkey" PRIMARY KEY ("bussinessCardId","likeArtId")
);

-- CreateTable
CREATE TABLE "BussinessCardRank" (
    "bussinessCardId" STRING NOT NULL,
    "rank" STRING NOT NULL,

    CONSTRAINT "BussinessCardRank_pkey" PRIMARY KEY ("bussinessCardId","rank")
);

-- CreateTable
CREATE TABLE "ProfileComment" (
    "commentId" STRING NOT NULL,
    "bussinessCardId" STRING NOT NULL,
    "content" STRING NOT NULL,

    CONSTRAINT "ProfileComment_pkey" PRIMARY KEY ("commentId")
);

-- CreateTable
CREATE TABLE "ProfileCommentGoodUser" (
    "commentId" STRING NOT NULL,
    "goodUserId" STRING NOT NULL,

    CONSTRAINT "ProfileCommentGoodUser_pkey" PRIMARY KEY ("commentId","goodUserId")
);

-- CreateTable
CREATE TABLE "BussinessCardGoodUser" (
    "bussinessCardId" STRING NOT NULL,
    "userId" STRING NOT NULL,

    CONSTRAINT "BussinessCardGoodUser_pkey" PRIMARY KEY ("bussinessCardId","userId")
);

-- CreateTable
CREATE TABLE "Notification" (
    "notificationId" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "content" STRING NOT NULL,
    "type" STRING NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("notificationId")
);

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockUser" ADD CONSTRAINT "BlockUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockUser" ADD CONSTRAINT "BlockUser_blockUserId_fkey" FOREIGN KEY ("blockUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRank" ADD CONSTRAINT "UserRank_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedArt" ADD CONSTRAINT "RelatedArt_relatedArtId_fkey" FOREIGN KEY ("relatedArtId") REFERENCES "Art"("artId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtTag" ADD CONSTRAINT "ArtTag_artId_fkey" FOREIGN KEY ("artId") REFERENCES "Art"("artId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterestTag" ADD CONSTRAINT "InterestTag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtGoodUser" ADD CONSTRAINT "ArtGoodUser_artArtId_fkey" FOREIGN KEY ("artArtId") REFERENCES "Art"("artId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtGoodUser" ADD CONSTRAINT "ArtGoodUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecommendArt" ADD CONSTRAINT "RecommendArt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecommendArt" ADD CONSTRAINT "RecommendArt_artId_fkey" FOREIGN KEY ("artId") REFERENCES "Art"("artId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchingArt" ADD CONSTRAINT "WatchingArt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchingArt" ADD CONSTRAINT "WatchingArt_artId_fkey" FOREIGN KEY ("artId") REFERENCES "Art"("artId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookmarkArt" ADD CONSTRAINT "BookmarkArt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookmarkArt" ADD CONSTRAINT "BookmarkArt_artId_fkey" FOREIGN KEY ("artId") REFERENCES "Art"("artId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BussinessCard" ADD CONSTRAINT "BussinessCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BussinessCardLikeArt" ADD CONSTRAINT "BussinessCardLikeArt_bussinessCardId_fkey" FOREIGN KEY ("bussinessCardId") REFERENCES "BussinessCard"("bussinessCardId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BussinessCardLikeArt" ADD CONSTRAINT "BussinessCardLikeArt_likeArtId_fkey" FOREIGN KEY ("likeArtId") REFERENCES "Art"("artId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileComment" ADD CONSTRAINT "ProfileComment_bussinessCardId_fkey" FOREIGN KEY ("bussinessCardId") REFERENCES "BussinessCard"("bussinessCardId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileCommentGoodUser" ADD CONSTRAINT "ProfileCommentGoodUser_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "ProfileComment"("commentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileCommentGoodUser" ADD CONSTRAINT "ProfileCommentGoodUser_goodUserId_fkey" FOREIGN KEY ("goodUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BussinessCardGoodUser" ADD CONSTRAINT "BussinessCardGoodUser_bussinessCardId_fkey" FOREIGN KEY ("bussinessCardId") REFERENCES "BussinessCard"("bussinessCardId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BussinessCardGoodUser" ADD CONSTRAINT "BussinessCardGoodUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateIndex
CREATE INDEX "ArtAppeal_userId_idx" ON "ArtAppeal"("userId");

-- CreateIndex
CREATE INDEX "ArtAppeal_artId_idx" ON "ArtAppeal"("artId");

-- CreateIndex
CREATE INDEX "ArtGoodUser_artId_idx" ON "ArtGoodUser"("artId");

-- CreateIndex
CREATE INDEX "ArtGoodUser_userId_idx" ON "ArtGoodUser"("userId");

-- CreateIndex
CREATE INDEX "ArtTag_artId_idx" ON "ArtTag"("artId");

-- CreateIndex
CREATE INDEX "BusinessCard_userId_idx" ON "BusinessCard"("userId");

-- CreateIndex
CREATE INDEX "BusinessCardInterestTag_businessCardId_idx" ON "BusinessCardInterestTag"("businessCardId");

-- CreateIndex
CREATE INDEX "BusinessCardLikeArt_businessCardId_idx" ON "BusinessCardLikeArt"("businessCardId");

-- CreateIndex
CREATE INDEX "Follower_userId_idx" ON "Follower"("userId");

-- CreateIndex
CREATE INDEX "Follower_followerId_idx" ON "Follower"("followerId");

-- CreateIndex
CREATE INDEX "InterestTag_userId_idx" ON "InterestTag"("userId");

-- CreateIndex
CREATE INDEX "Notification_userId_type_content_idx" ON "Notification"("userId", "type", "content");

-- CreateIndex
CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");

-- CreateIndex
CREATE INDEX "RelatedArt_artId_userId_idx" ON "RelatedArt"("artId", "userId");

-- CreateIndex
CREATE INDEX "RelatedArt_artId_idx" ON "RelatedArt"("artId");

-- CreateIndex
CREATE INDEX "UserComment_targetUserId_idx" ON "UserComment"("targetUserId");

-- CreateIndex
CREATE INDEX "WatchingArt_userId_idx" ON "WatchingArt"("userId");

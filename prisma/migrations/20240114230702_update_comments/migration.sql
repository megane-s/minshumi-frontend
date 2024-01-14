-- CreateTable
CREATE TABLE "UserComment" (
    "commentId" STRING NOT NULL,
    "content" STRING NOT NULL,
    "commentUserId" STRING NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserComment_pkey" PRIMARY KEY ("commentId")
);

-- CreateTable
CREATE TABLE "UserCommentGoodUser" (
    "commentId" STRING NOT NULL,
    "goodUserId" STRING NOT NULL,

    CONSTRAINT "UserCommentGoodUser_pkey" PRIMARY KEY ("commentId","goodUserId")
);

-- AddForeignKey
ALTER TABLE "UserComment" ADD CONSTRAINT "UserComment_commentUserId_fkey" FOREIGN KEY ("commentUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCommentGoodUser" ADD CONSTRAINT "UserCommentGoodUser_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "UserComment"("commentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCommentGoodUser" ADD CONSTRAINT "UserCommentGoodUser_goodUserId_fkey" FOREIGN KEY ("goodUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "Test" (
    "id" INT8 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "message" STRING NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

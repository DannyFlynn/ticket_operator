-- CreateTable
CREATE TABLE "Tasks" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR(100) NOT NULL,
    "user" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);

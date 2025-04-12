-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "rollNumber" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_rollNumber_key" ON "user"("rollNumber");

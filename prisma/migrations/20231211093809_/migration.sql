-- CreateTable
CREATE TABLE "Travelpass" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "typeOf" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Travelpass_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Travelpass" ADD CONSTRAINT "Travelpass_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deductionsId" TEXT[];

-- CreateTable
CREATE TABLE "Deductions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Deductions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Deductions_name_key" ON "Deductions"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_deductionsId_fkey" FOREIGN KEY ("deductionsId") REFERENCES "Deductions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

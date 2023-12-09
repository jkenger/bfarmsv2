/*
  Warnings:

  - You are about to drop the column `description` on the `PayrollGroup` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Designation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_payrollGroupId_fkey";

-- DropIndex
DROP INDEX "User_designationId_key";

-- DropIndex
DROP INDEX "User_payrollGroupId_key";

-- AlterTable
ALTER TABLE "PayrollGroup" DROP COLUMN "description";

-- CreateTable
CREATE TABLE "Holiday" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "prerequisiteDate" TIMESTAMP(3) NOT NULL,
    "requisiteDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Holiday_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Holiday_name_key" ON "Holiday"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Designation_name_key" ON "Designation"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_payrollGroupId_fkey" FOREIGN KEY ("payrollGroupId") REFERENCES "PayrollGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

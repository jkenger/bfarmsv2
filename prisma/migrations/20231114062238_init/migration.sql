/*
  Warnings:

  - You are about to drop the `House` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[payrollGroupId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[designationId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `designationId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payrollGroupId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "House" DROP CONSTRAINT "House_builtById_fkey";

-- DropForeignKey
ALTER TABLE "House" DROP CONSTRAINT "House_ownerId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "designationId" TEXT NOT NULL,
ADD COLUMN     "payrollGroupId" TEXT NOT NULL;

-- DropTable
DROP TABLE "House";

-- CreateTable
CREATE TABLE "PayrollGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PayrollGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Designation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "salary" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Designation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_payrollGroupId_key" ON "User"("payrollGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "User_designationId_key" ON "User"("designationId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_payrollGroupId_fkey" FOREIGN KEY ("payrollGroupId") REFERENCES "PayrollGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_designationId_fkey" FOREIGN KEY ("designationId") REFERENCES "Designation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

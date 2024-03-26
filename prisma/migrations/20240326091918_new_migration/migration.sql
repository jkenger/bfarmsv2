/*
  Warnings:

  - You are about to drop the column `isLate` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `isOnTime` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `isUndertime` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `lateMinutes` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `undertimeMinutes` on the `Attendance` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Payroll" DROP CONSTRAINT "Payroll_payrollGroupId_fkey";

-- DropForeignKey
ALTER TABLE "Receipt" DROP CONSTRAINT "Receipt_userId_fkey";

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "isLate",
DROP COLUMN "isOnTime",
DROP COLUMN "isUndertime",
DROP COLUMN "lateMinutes",
DROP COLUMN "undertimeMinutes",
ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "noOfHoursWorked" DOUBLE PRECISION,
ADD COLUMN     "travelPass" TEXT,
ADD COLUMN     "undertime" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Payroll" ADD COLUMN     "fundCluster" TEXT,
ADD COLUMN     "payrollNumber" TEXT,
ADD COLUMN     "programName" TEXT,
ADD COLUMN     "projectName" TEXT;

-- AlterTable
ALTER TABLE "Receipt" ADD COLUMN     "designation" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "salary" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Travelpass" ADD COLUMN     "expireAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accountId" TEXT;

-- CreateTable
CREATE TABLE "TimeCard" (
    "id" TEXT NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "isAllEmployees" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimeCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sheet" (
    "id" TEXT NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "timeCardId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "attendances" JSONB[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sheet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "twofaEnabled" BOOLEAN NOT NULL DEFAULT false,
    "twofaSecret" TEXT NOT NULL DEFAULT '',
    "roles" TEXT[],

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- AddForeignKey
ALTER TABLE "Sheet" ADD CONSTRAINT "Sheet_timeCardId_fkey" FOREIGN KEY ("timeCardId") REFERENCES "TimeCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payroll" ADD CONSTRAINT "Payroll_payrollGroupId_fkey" FOREIGN KEY ("payrollGroupId") REFERENCES "PayrollGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

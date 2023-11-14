-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_designationId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_payrollGroupId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "designationId" DROP NOT NULL,
ALTER COLUMN "payrollGroupId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_payrollGroupId_fkey" FOREIGN KEY ("payrollGroupId") REFERENCES "PayrollGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_designationId_fkey" FOREIGN KEY ("designationId") REFERENCES "Designation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

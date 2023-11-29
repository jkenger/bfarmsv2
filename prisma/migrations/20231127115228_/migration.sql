-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_payrollGroupId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "middleName" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_payrollGroupId_fkey" FOREIGN KEY ("payrollGroupId") REFERENCES "PayrollGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

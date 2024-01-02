/*
  Warnings:

  - You are about to drop the column `receiptId` on the `Payroll` table. All the data in the column will be lost.
  - Added the required column `payrollId` to the `Receipt` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Payroll" DROP CONSTRAINT "Payroll_receiptId_fkey";

-- DropForeignKey
ALTER TABLE "Receipt" DROP CONSTRAINT "Receipt_userId_fkey";

-- DropIndex
DROP INDEX "Payroll_receiptId_key";

-- AlterTable
ALTER TABLE "Payroll" DROP COLUMN "receiptId";

-- AlterTable
ALTER TABLE "Receipt" ADD COLUMN     "payrollId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_payrollId_fkey" FOREIGN KEY ("payrollId") REFERENCES "Payroll"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

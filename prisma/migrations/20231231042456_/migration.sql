/*
  Warnings:

  - You are about to drop the `_HolidayToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_HolidayToUser" DROP CONSTRAINT "_HolidayToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_HolidayToUser" DROP CONSTRAINT "_HolidayToUser_B_fkey";

-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "isHalfDay" BOOLEAN;

-- DropTable
DROP TABLE "_HolidayToUser";

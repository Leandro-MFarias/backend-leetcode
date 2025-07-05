/*
  Warnings:

  - Made the column `languageId` on table `Exercise` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_languageId_fkey";

-- AlterTable
ALTER TABLE "Exercise" ALTER COLUMN "languageId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

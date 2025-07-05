/*
  Warnings:

  - Made the column `functionName` on table `Exercise` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "languageId" INTEGER,
ALTER COLUMN "functionName" SET NOT NULL;

-- CreateTable
CREATE TABLE "Language" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" INTEGER NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

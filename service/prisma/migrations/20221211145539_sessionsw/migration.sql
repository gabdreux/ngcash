/*
  Warnings:

  - You are about to drop the column `end` on the `ActiveSections` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `ActiveSections` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `ActiveSections` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `ActiveSections` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `ActiveSections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endSession` to the `ActiveSections` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ActiveSections_userName_key";

-- AlterTable
ALTER TABLE "ActiveSections" DROP COLUMN "end",
DROP COLUMN "password",
DROP COLUMN "start",
DROP COLUMN "userName",
ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "endSession" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "startSession" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "ActiveSections_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "ActiveSections" ADD CONSTRAINT "ActiveSections_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

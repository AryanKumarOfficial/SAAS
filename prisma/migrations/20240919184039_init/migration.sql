/*
  Warnings:

  - You are about to drop the column `durartion` on the `Video` table. All the data in the column will be lost.
  - Added the required column `duration` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "durartion",
ADD COLUMN     "duration" DOUBLE PRECISION NOT NULL;

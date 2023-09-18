/*
  Warnings:

  - You are about to drop the column `message` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "message",
ADD COLUMN     "role" "RoleName" NOT NULL DEFAULT 'USER';

/*
  Warnings:

  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "message" "RoleName" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "Role";

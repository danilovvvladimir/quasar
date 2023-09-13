/*
  Warnings:

  - You are about to drop the column `wishlistedById` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_wishlistedById_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "wishlistedById",
ADD COLUMN     "user_id" TEXT;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

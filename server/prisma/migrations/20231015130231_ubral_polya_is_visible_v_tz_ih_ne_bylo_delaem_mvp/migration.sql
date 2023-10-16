/*
  Warnings:

  - You are about to drop the column `is_visible` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `is_visible` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "is_visible";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "is_visible";

/*
  Warnings:

  - You are about to drop the column `isVisible` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `currentPrice` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `discount_percentage` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isVisible` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `oldPrice` on the `Product` table. All the data in the column will be lost.
  - Added the required column `is_visible` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `current_price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_visible` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "isVisible",
ADD COLUMN     "is_visible" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "currentPrice",
DROP COLUMN "discount_percentage",
DROP COLUMN "isVisible",
DROP COLUMN "oldPrice",
ADD COLUMN     "current_price" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "is_visible" BOOLEAN NOT NULL,
ADD COLUMN     "old_price" DECIMAL(65,30);

/*
  Warnings:

  - You are about to drop the column `categoryId` on the `ProductCategory` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `ProductCategory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_productId_fkey";

-- AlterTable
ALTER TABLE "ProductCategory" DROP COLUMN "categoryId",
DROP COLUMN "productId",
ADD COLUMN     "category_id" TEXT,
ADD COLUMN     "product_id" TEXT;

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

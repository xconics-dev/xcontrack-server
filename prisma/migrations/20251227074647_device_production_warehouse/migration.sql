/*
  Warnings:

  - Added the required column `productionWarehouseId` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Device" ADD COLUMN     "productionWarehouseId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_productionWarehouseId_fkey" FOREIGN KEY ("productionWarehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

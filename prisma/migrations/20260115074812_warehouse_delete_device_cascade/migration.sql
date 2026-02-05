-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_productionWarehouseId_fkey";

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_productionWarehouseId_fkey" FOREIGN KEY ("productionWarehouseId") REFERENCES "Warehouse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

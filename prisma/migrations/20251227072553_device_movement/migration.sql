/*
  Warnings:

  - You are about to drop the column `fromEntityId` on the `DeviceMovement` table. All the data in the column will be lost.
  - You are about to drop the column `toEntityId` on the `DeviceMovement` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "DeviceMovement_fromEntityType_fromEntityId_idx";

-- DropIndex
DROP INDEX "DeviceMovement_toEntityType_toEntityId_idx";

-- AlterTable
ALTER TABLE "DeviceMovement" DROP COLUMN "fromEntityId",
DROP COLUMN "toEntityId",
ADD COLUMN     "fromEntityFieldEngineerId" UUID,
ADD COLUMN     "fromEntityVehicleId" UUID,
ADD COLUMN     "fromEntityWarehouseId" UUID,
ADD COLUMN     "toEntityFieldEngineerId" UUID,
ADD COLUMN     "toEntityVehicleId" UUID,
ADD COLUMN     "toEntityWarehouseId" UUID;

-- AddForeignKey
ALTER TABLE "DeviceMovement" ADD CONSTRAINT "DeviceMovement_fromEntityWarehouseId_fkey" FOREIGN KEY ("fromEntityWarehouseId") REFERENCES "Warehouse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceMovement" ADD CONSTRAINT "DeviceMovement_fromEntityFieldEngineerId_fkey" FOREIGN KEY ("fromEntityFieldEngineerId") REFERENCES "FieldEngineer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceMovement" ADD CONSTRAINT "DeviceMovement_fromEntityVehicleId_fkey" FOREIGN KEY ("fromEntityVehicleId") REFERENCES "InstallationRequisition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceMovement" ADD CONSTRAINT "DeviceMovement_toEntityWarehouseId_fkey" FOREIGN KEY ("toEntityWarehouseId") REFERENCES "Warehouse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceMovement" ADD CONSTRAINT "DeviceMovement_toEntityFieldEngineerId_fkey" FOREIGN KEY ("toEntityFieldEngineerId") REFERENCES "FieldEngineer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceMovement" ADD CONSTRAINT "DeviceMovement_toEntityVehicleId_fkey" FOREIGN KEY ("toEntityVehicleId") REFERENCES "InstallationRequisition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

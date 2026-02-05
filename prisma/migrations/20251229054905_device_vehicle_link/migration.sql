/*
  Warnings:

  - You are about to drop the column `installationRequisitionId` on the `DeviceTracking` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[installationRequisitionId]` on the table `Device` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `deviceId` on the `DeviceTracking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "DeviceTracking_installationRequisitionId_idx";

-- AlterTable
ALTER TABLE "Device" ADD COLUMN     "installationRequisitionId" UUID;

-- AlterTable
ALTER TABLE "DeviceTracking" DROP COLUMN "installationRequisitionId",
DROP COLUMN "deviceId",
ADD COLUMN     "deviceId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Device_installationRequisitionId_key" ON "Device"("installationRequisitionId");

-- CreateIndex
CREATE INDEX "DeviceTracking_deviceId_idx" ON "DeviceTracking"("deviceId");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_installationRequisitionId_fkey" FOREIGN KEY ("installationRequisitionId") REFERENCES "InstallationRequisition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceTracking" ADD CONSTRAINT "DeviceTracking_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

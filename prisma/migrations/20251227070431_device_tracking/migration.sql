/*
  Warnings:

  - You are about to drop the column `assignedEngineerId` on the `InstallationRequisition` table. All the data in the column will be lost.
  - You are about to drop the column `engineerAcceptTicket` on the `InstallationRequisition` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[vehicleNo]` on the table `InstallationRequisition` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `deviceId` on the `DeviceMovement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('PRODUCTION_FLOOR', 'WAREHOUSE', 'FIELD_ENGINEER', 'VEHICLE');

-- DropForeignKey
ALTER TABLE "InstallationRequisition" DROP CONSTRAINT "InstallationRequisition_assignedEngineerId_fkey";

-- DropIndex
DROP INDEX "InstallationRequisition_assignedEngineerId_idx";

-- AlterTable
ALTER TABLE "DeviceMovement" DROP COLUMN "deviceId",
ADD COLUMN     "deviceId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "InstallationRequisition" DROP COLUMN "assignedEngineerId",
DROP COLUMN "engineerAcceptTicket";

-- CreateTable
CREATE TABLE "FieldEngineerLocationLog" (
    "id" UUID NOT NULL,
    "fieldEngineerId" UUID NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "long" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FieldEngineerLocationLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstallationRequisitionRequest" (
    "id" UUID NOT NULL,
    "installationRequisitionId" UUID NOT NULL,
    "assignedEngineerId" UUID,
    "engineerAcceptTicket" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InstallationRequisitionRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" UUID NOT NULL,
    "imei" TEXT NOT NULL,
    "qr" TEXT NOT NULL,
    "locationType" "LocationType" NOT NULL,
    "locationProductionFloor" TEXT NOT NULL DEFAULT 'PF-1',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeviceTracking" (
    "id" UUID NOT NULL,
    "deviceId" TEXT NOT NULL,
    "installationRequisitionId" TEXT,
    "vehicleNumber" TEXT NOT NULL,
    "trackingTimestamp" TIMESTAMP(3) NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "altitude" DOUBLE PRECISION,
    "speed" DOUBLE PRECISION,
    "heading" DOUBLE PRECISION,
    "gsmSignalStrength" INTEGER,
    "satelliteCount" INTEGER,
    "batteryVoltage" DOUBLE PRECISION,
    "ignitionStatus" "IgnitionStatus" NOT NULL,
    "tamperStatus" "TamperStatus" NOT NULL,
    "powerStatus" "PowerStatus" NOT NULL,
    "theftAlert" BOOLEAN NOT NULL DEFAULT false,
    "tamperAlert" BOOLEAN NOT NULL DEFAULT false,
    "lowBatteryAlert" BOOLEAN NOT NULL DEFAULT false,
    "dataSource" "TrackingDataSource" NOT NULL,
    "isValid" BOOLEAN NOT NULL DEFAULT true,
    "receivedAt" TIMESTAMP(3) NOT NULL,
    "processedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeviceTracking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FieldEngineerLocationLog_fieldEngineerId_idx" ON "FieldEngineerLocationLog"("fieldEngineerId");

-- CreateIndex
CREATE INDEX "InstallationRequisitionRequest_installationRequisitionId_idx" ON "InstallationRequisitionRequest"("installationRequisitionId");

-- CreateIndex
CREATE UNIQUE INDEX "InstallationRequisitionRequest_installationRequisitionId_as_key" ON "InstallationRequisitionRequest"("installationRequisitionId", "assignedEngineerId");

-- CreateIndex
CREATE UNIQUE INDEX "Device_imei_key" ON "Device"("imei");

-- CreateIndex
CREATE UNIQUE INDEX "Device_qr_key" ON "Device"("qr");

-- CreateIndex
CREATE INDEX "DeviceTracking_deviceId_idx" ON "DeviceTracking"("deviceId");

-- CreateIndex
CREATE INDEX "DeviceTracking_installationRequisitionId_idx" ON "DeviceTracking"("installationRequisitionId");

-- CreateIndex
CREATE INDEX "DeviceTracking_vehicleNumber_idx" ON "DeviceTracking"("vehicleNumber");

-- CreateIndex
CREATE INDEX "DeviceTracking_trackingTimestamp_idx" ON "DeviceTracking"("trackingTimestamp");

-- CreateIndex
CREATE INDEX "DeviceTracking_isValid_idx" ON "DeviceTracking"("isValid");

-- CreateIndex
CREATE INDEX "DeviceMovement_deviceId_idx" ON "DeviceMovement"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "InstallationRequisition_vehicleNo_key" ON "InstallationRequisition"("vehicleNo");

-- AddForeignKey
ALTER TABLE "FieldEngineerLocationLog" ADD CONSTRAINT "FieldEngineerLocationLog_fieldEngineerId_fkey" FOREIGN KEY ("fieldEngineerId") REFERENCES "FieldEngineer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceMovement" ADD CONSTRAINT "DeviceMovement_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstallationRequisitionRequest" ADD CONSTRAINT "InstallationRequisitionRequest_installationRequisitionId_fkey" FOREIGN KEY ("installationRequisitionId") REFERENCES "InstallationRequisition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstallationRequisitionRequest" ADD CONSTRAINT "InstallationRequisitionRequest_assignedEngineerId_fkey" FOREIGN KEY ("assignedEngineerId") REFERENCES "FieldEngineer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceTracking" ADD CONSTRAINT "DeviceTracking_vehicleNumber_fkey" FOREIGN KEY ("vehicleNumber") REFERENCES "InstallationRequisition"("vehicleNo") ON DELETE RESTRICT ON UPDATE CASCADE;

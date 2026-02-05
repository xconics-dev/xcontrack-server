-- CreateEnum
CREATE TYPE "SupportStatus" AS ENUM ('NEW', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'PENDING', 'ACCEPTED');

-- DropForeignKey
ALTER TABLE "DeviceMovement" DROP CONSTRAINT "DeviceMovement_deviceId_fkey";

-- DropForeignKey
ALTER TABLE "DeviceTracking" DROP CONSTRAINT "DeviceTracking_deviceId_fkey";

-- DropForeignKey
ALTER TABLE "DeviceTracking" DROP CONSTRAINT "DeviceTracking_vehicleNumber_fkey";

-- DropForeignKey
ALTER TABLE "FieldEngineer" DROP CONSTRAINT "FieldEngineer_aggregatorId_fkey";

-- DropForeignKey
ALTER TABLE "FieldEngineerLocationLog" DROP CONSTRAINT "FieldEngineerLocationLog_fieldEngineerId_fkey";

-- DropForeignKey
ALTER TABLE "FieldEngineerPincodeMapping" DROP CONSTRAINT "FieldEngineerPincodeMapping_fieldEngineerId_fkey";

-- DropForeignKey
ALTER TABLE "InstallationRequisition" DROP CONSTRAINT "InstallationRequisition_branchId_fkey";

-- DropForeignKey
ALTER TABLE "InstallationRequisition" DROP CONSTRAINT "InstallationRequisition_lenderId_fkey";

-- DropForeignKey
ALTER TABLE "InstallationRequisitionRequest" DROP CONSTRAINT "InstallationRequisitionRequest_assignedEngineerId_fkey";

-- DropForeignKey
ALTER TABLE "InstallationRequisitionRequest" DROP CONSTRAINT "InstallationRequisitionRequest_installationRequisitionId_fkey";

-- DropForeignKey
ALTER TABLE "LenderBranch" DROP CONSTRAINT "LenderBranch_lenderId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_aggregatorId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_fieldEngineerId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_lenderId_fkey";

-- DropForeignKey
ALTER TABLE "Warehouse" DROP CONSTRAINT "Warehouse_aggregatorId_fkey";

-- DropForeignKey
ALTER TABLE "WarehousePincodeMapping" DROP CONSTRAINT "WarehousePincodeMapping_warehouseId_fkey";

-- CreateTable
CREATE TABLE "SupportTicket" (
    "id" UUID NOT NULL,
    "installationRequisitionId" UUID NOT NULL,
    "ticketNo" TEXT NOT NULL,
    "issueDetail" TEXT NOT NULL,
    "supportAddress" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "requestedBy" UUID,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "preferredSupportDate" TIMESTAMP(3),
    "assignedAggregatorId" UUID,
    "tatHours" INTEGER NOT NULL,
    "supportFinishTimeAssigned" TIMESTAMP(3),
    "status" "SupportStatus" NOT NULL DEFAULT 'PENDING',
    "completedAt" TIMESTAMP(3),
    "aadhaarVerificationStatus" "AadhaarVerificationStatus" NOT NULL DEFAULT 'NOT_VERIFIED',
    "aadhaarVerifiedBy" UUID,
    "aadhaarVerifiedAt" TIMESTAMP(3),
    "vehicleNumberPlateImage" TEXT,
    "vehicleImage" TEXT,
    "customerImage" TEXT,
    "gsmChecklist" "ChecklistStatus",
    "gsmSignalStrength" INTEGER,
    "gpsChecklist" "ChecklistStatus",
    "gpsSatelliteCount" INTEGER,
    "mainPowerChecklist" "ChecklistStatus",
    "batteryBackupStatus" "BatteryBackupStatus",
    "checklistVerifiedBy" UUID,
    "checklistVerifiedAt" TIMESTAMP(3),
    "xconicsValidation" BOOLEAN NOT NULL DEFAULT false,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SupportTicket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupportTicketRequest" (
    "id" UUID NOT NULL,
    "supportTicketId" UUID NOT NULL,
    "assignedEngineerId" UUID NOT NULL,
    "engineerAcceptTicket" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SupportTicketRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SupportTicket_ticketNo_key" ON "SupportTicket"("ticketNo");

-- CreateIndex
CREATE INDEX "SupportTicket_assignedAggregatorId_idx" ON "SupportTicket"("assignedAggregatorId");

-- CreateIndex
CREATE INDEX "SupportTicket_status_idx" ON "SupportTicket"("status");

-- CreateIndex
CREATE INDEX "SupportTicketRequest_supportTicketId_idx" ON "SupportTicketRequest"("supportTicketId");

-- CreateIndex
CREATE UNIQUE INDEX "SupportTicketRequest_supportTicketId_assignedEngineerId_key" ON "SupportTicketRequest"("supportTicketId", "assignedEngineerId");

-- AddForeignKey
ALTER TABLE "LenderBranch" ADD CONSTRAINT "LenderBranch_lenderId_fkey" FOREIGN KEY ("lenderId") REFERENCES "Lender"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warehouse" ADD CONSTRAINT "Warehouse_aggregatorId_fkey" FOREIGN KEY ("aggregatorId") REFERENCES "Aggregator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarehousePincodeMapping" ADD CONSTRAINT "WarehousePincodeMapping_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldEngineer" ADD CONSTRAINT "FieldEngineer_aggregatorId_fkey" FOREIGN KEY ("aggregatorId") REFERENCES "Aggregator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldEngineerPincodeMapping" ADD CONSTRAINT "FieldEngineerPincodeMapping_fieldEngineerId_fkey" FOREIGN KEY ("fieldEngineerId") REFERENCES "FieldEngineer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldEngineerLocationLog" ADD CONSTRAINT "FieldEngineerLocationLog_fieldEngineerId_fkey" FOREIGN KEY ("fieldEngineerId") REFERENCES "FieldEngineer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceMovement" ADD CONSTRAINT "DeviceMovement_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstallationRequisition" ADD CONSTRAINT "InstallationRequisition_lenderId_fkey" FOREIGN KEY ("lenderId") REFERENCES "Lender"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstallationRequisition" ADD CONSTRAINT "InstallationRequisition_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "LenderBranch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstallationRequisitionRequest" ADD CONSTRAINT "InstallationRequisitionRequest_installationRequisitionId_fkey" FOREIGN KEY ("installationRequisitionId") REFERENCES "InstallationRequisition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstallationRequisitionRequest" ADD CONSTRAINT "InstallationRequisitionRequest_assignedEngineerId_fkey" FOREIGN KEY ("assignedEngineerId") REFERENCES "FieldEngineer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportTicket" ADD CONSTRAINT "SupportTicket_installationRequisitionId_fkey" FOREIGN KEY ("installationRequisitionId") REFERENCES "InstallationRequisition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportTicket" ADD CONSTRAINT "SupportTicket_requestedBy_fkey" FOREIGN KEY ("requestedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportTicket" ADD CONSTRAINT "SupportTicket_assignedAggregatorId_fkey" FOREIGN KEY ("assignedAggregatorId") REFERENCES "Aggregator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportTicket" ADD CONSTRAINT "SupportTicket_aadhaarVerifiedBy_fkey" FOREIGN KEY ("aadhaarVerifiedBy") REFERENCES "FieldEngineer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportTicket" ADD CONSTRAINT "SupportTicket_checklistVerifiedBy_fkey" FOREIGN KEY ("checklistVerifiedBy") REFERENCES "FieldEngineer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportTicketRequest" ADD CONSTRAINT "SupportTicketRequest_supportTicketId_fkey" FOREIGN KEY ("supportTicketId") REFERENCES "SupportTicket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportTicketRequest" ADD CONSTRAINT "SupportTicketRequest_assignedEngineerId_fkey" FOREIGN KEY ("assignedEngineerId") REFERENCES "FieldEngineer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_aggregatorId_fkey" FOREIGN KEY ("aggregatorId") REFERENCES "Aggregator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_lenderId_fkey" FOREIGN KEY ("lenderId") REFERENCES "Lender"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_fieldEngineerId_fkey" FOREIGN KEY ("fieldEngineerId") REFERENCES "FieldEngineer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceTracking" ADD CONSTRAINT "DeviceTracking_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceTracking" ADD CONSTRAINT "DeviceTracking_vehicleNumber_fkey" FOREIGN KEY ("vehicleNumber") REFERENCES "InstallationRequisition"("vehicleNo") ON DELETE CASCADE ON UPDATE CASCADE;

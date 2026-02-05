-- CreateEnum
CREATE TYPE "LenderType" AS ENUM ('NBFC', 'BANK', 'LEASING');

-- CreateEnum
CREATE TYPE "BillingCycle" AS ENUM ('WEEKLY', 'FORTNIGHTLY', 'MONTHLY');

-- CreateEnum
CREATE TYPE "LenderStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "BranchType" AS ENUM ('HO', 'REGIONAL', 'AREA', 'BRANCH');

-- CreateEnum
CREATE TYPE "BranchStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "WarehouseType" AS ENUM ('PRODUCTION', 'LOCAL', 'REGIONAL');

-- CreateEnum
CREATE TYPE "WarehouseOwnerType" AS ENUM ('XCONICS', 'AGGREGATOR');

-- CreateEnum
CREATE TYPE "WarehouseStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "AggregatorServiceType" AS ENUM ('INSTALLATION', 'REPAIR', 'BOTH');

-- CreateEnum
CREATE TYPE "AggregatorBillingCycle" AS ENUM ('WEEKLY', 'FORTNIGHTLY');

-- CreateEnum
CREATE TYPE "AggregatorStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "EngineerEmploymentType" AS ENUM ('XCONICS', 'AGGREGATOR');

-- CreateEnum
CREATE TYPE "EngineerStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ON_LEAVE');

-- CreateEnum
CREATE TYPE "EngineerSkill" AS ENUM ('GPS', 'CAMERA', 'ELECTRICAL');

-- CreateEnum
CREATE TYPE "EngineerIdProofType" AS ENUM ('AADHAAR', 'DL', 'PAN');

-- CreateEnum
CREATE TYPE "DeviceMovementType" AS ENUM ('PROD_TO_WH', 'WH_TO_ENGINEER', 'ENGINEER_TO_VEHICLE');

-- CreateEnum
CREATE TYPE "MovementEntityType" AS ENUM ('PRODUCTION_WAREHOUSE', 'WAREHOUSE', 'ENGINEER', 'VEHICLE');

-- CreateEnum
CREATE TYPE "DeviceMovementStatus" AS ENUM ('IN_TRANSIT', 'RECEIVED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "InstallationDeviceType" AS ENUM ('GPS', 'CAMERA', 'SENSOR');

-- CreateEnum
CREATE TYPE "InstallationPriority" AS ENUM ('NORMAL', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "InstallationStatus" AS ENUM ('NEW', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "AadhaarVerificationStatus" AS ENUM ('VERIFIED', 'NOT_VERIFIED');

-- CreateEnum
CREATE TYPE "ChecklistStatus" AS ENUM ('PASS', 'FAIL');

-- CreateEnum
CREATE TYPE "BatteryBackupStatus" AS ENUM ('OK', 'NOT_OK');

-- CreateEnum
CREATE TYPE "userType" AS ENUM ('XCONICS', 'AGGREGATOR', 'LENDER', 'FIELD_ENGINEER');

-- CreateEnum
CREATE TYPE "IgnitionStatus" AS ENUM ('ON', 'OFF');

-- CreateEnum
CREATE TYPE "TamperStatus" AS ENUM ('NORMAL', 'TAMPER');

-- CreateEnum
CREATE TYPE "PowerStatus" AS ENUM ('EXTERNAL', 'BATTERY');

-- CreateEnum
CREATE TYPE "TrackingDataSource" AS ENUM ('MQTT', 'TCP', 'HTTP');

-- CreateTable
CREATE TABLE "Lender" (
    "id" UUID NOT NULL,
    "lenderCode" TEXT NOT NULL,
    "lenderName" TEXT NOT NULL,
    "lenderType" "LenderType" NOT NULL,
    "contactPersonName" TEXT NOT NULL,
    "contactMobile" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "registeredAddress" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "gstNumber" TEXT,
    "panNumber" TEXT,
    "billingCycle" "BillingCycle" NOT NULL,
    "paymentTermsDays" INTEGER NOT NULL,
    "ldApplicable" BOOLEAN NOT NULL,
    "ldPercentageCap" DOUBLE PRECISION,
    "pilotStartDate" TIMESTAMP(3),
    "pilotEndDate" TIMESTAMP(3),
    "agreementStartDate" TIMESTAMP(3) NOT NULL,
    "agreementEndDate" TIMESTAMP(3),
    "status" "LenderStatus" NOT NULL DEFAULT 'ACTIVE',
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LenderBranch" (
    "id" UUID NOT NULL,
    "lenderId" UUID NOT NULL,
    "branchCode" TEXT NOT NULL,
    "branchName" TEXT NOT NULL,
    "branchType" "BranchType" NOT NULL,
    "contactPersonName" TEXT NOT NULL,
    "contactMobile" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "locationUpdatedAt" TIMESTAMP(3),
    "billingApplicable" BOOLEAN NOT NULL,
    "status" "BranchStatus" NOT NULL DEFAULT 'ACTIVE',
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LenderBranch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Warehouse" (
    "id" UUID NOT NULL,
    "warehouseCode" TEXT NOT NULL,
    "warehouseName" TEXT NOT NULL,
    "warehouseType" "WarehouseType" NOT NULL,
    "ownerType" "WarehouseOwnerType" NOT NULL,
    "aggregatorId" UUID,
    "address" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "contactPersonName" TEXT NOT NULL,
    "contactMobile" TEXT NOT NULL,
    "emailId" TEXT NOT NULL,
    "status" "WarehouseStatus" NOT NULL DEFAULT 'ACTIVE',
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Warehouse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WarehousePincodeMapping" (
    "id" UUID NOT NULL,
    "warehouseId" UUID NOT NULL,
    "mappingPincode" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WarehousePincodeMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aggregator" (
    "id" UUID NOT NULL,
    "aggregatorCode" TEXT NOT NULL,
    "aggregatorName" TEXT NOT NULL,
    "contactPersonName" TEXT NOT NULL,
    "contactMobile" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "officeAddress" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "serviceCoverage" TEXT NOT NULL,
    "serviceType" "AggregatorServiceType" NOT NULL,
    "tatHours" INTEGER NOT NULL,
    "ldApplicable" BOOLEAN NOT NULL DEFAULT false,
    "ldPercentageCap" DOUBLE PRECISION,
    "billingCycle" "AggregatorBillingCycle" NOT NULL,
    "paymentTermsDays" INTEGER NOT NULL,
    "contractStartDate" TIMESTAMP(3) NOT NULL,
    "contractEndDate" TIMESTAMP(3),
    "bankName" TEXT NOT NULL,
    "bankAccountNo" TEXT NOT NULL,
    "ifscCode" TEXT NOT NULL,
    "gstNumber" TEXT,
    "panNumber" TEXT,
    "status" "AggregatorStatus" NOT NULL DEFAULT 'ACTIVE',
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Aggregator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FieldEngineer" (
    "id" UUID NOT NULL,
    "engineerCode" TEXT NOT NULL,
    "engineerName" TEXT NOT NULL,
    "mobileNo" TEXT NOT NULL,
    "emailId" TEXT NOT NULL,
    "aggregatorId" UUID,
    "branchCode" TEXT NOT NULL,
    "employmentType" "EngineerEmploymentType" NOT NULL,
    "state" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "baseLocation" TEXT NOT NULL,
    "skillSet" "EngineerSkill"[],
    "assignedDeviceCount" INTEGER NOT NULL DEFAULT 0,
    "status" "EngineerStatus" NOT NULL DEFAULT 'ACTIVE',
    "joiningDate" TIMESTAMP(3) NOT NULL,
    "lastWorkingDate" TIMESTAMP(3),
    "idProofType" "EngineerIdProofType" NOT NULL,
    "idProofNumber" TEXT NOT NULL,
    "currentLatitude" DOUBLE PRECISION,
    "currentLongitude" DOUBLE PRECISION,
    "locationUpdatedAt" TIMESTAMP(3),
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FieldEngineer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeviceMovement" (
    "id" UUID NOT NULL,
    "deviceId" TEXT NOT NULL,
    "movementType" "DeviceMovementType" NOT NULL,
    "fromEntityType" "MovementEntityType" NOT NULL,
    "fromEntityId" TEXT NOT NULL,
    "toEntityType" "MovementEntityType" NOT NULL,
    "toEntityId" TEXT NOT NULL,
    "vehicleNumber" TEXT,
    "installationRequisitionId" TEXT,
    "movementDate" TIMESTAMP(3) NOT NULL,
    "dispatchedAt" TIMESTAMP(3),
    "receivedAt" TIMESTAMP(3),
    "movementStatus" "DeviceMovementStatus" NOT NULL DEFAULT 'IN_TRANSIT',
    "handoverProof" TEXT,
    "remarks" TEXT,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeviceMovement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstallationRequisition" (
    "id" UUID NOT NULL,
    "requisitionNo" TEXT NOT NULL,
    "lenderId" UUID NOT NULL,
    "branchId" UUID NOT NULL,
    "vehicleNo" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerMobile" TEXT NOT NULL,
    "installationAddress" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "deviceType" "InstallationDeviceType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "priority" "InstallationPriority" NOT NULL DEFAULT 'NORMAL',
    "requestedBy" TEXT NOT NULL,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "preferredInstallationDate" TIMESTAMP(3),
    "assignedAggregatorId" UUID,
    "assignedEngineerId" UUID,
    "tatHours" INTEGER NOT NULL,
    "engineerAcceptTicket" BOOLEAN NOT NULL DEFAULT false,
    "installationFinishTimeAssigned" TIMESTAMP(3),
    "status" "InstallationStatus" NOT NULL DEFAULT 'NEW',
    "completedAt" TIMESTAMP(3),
    "customerAadhaarNo" TEXT,
    "aadhaarVerificationStatus" "AadhaarVerificationStatus" NOT NULL DEFAULT 'NOT_VERIFIED',
    "aadhaarVerifiedBy" TEXT,
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
    "checklistVerifiedBy" TEXT,
    "checklistVerifiedAt" TIMESTAMP(3),
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InstallationRequisition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" "userType" NOT NULL,
    "aggregatorId" UUID,
    "lenderId" UUID,
    "fieldEngineerId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lender_lenderCode_key" ON "Lender"("lenderCode");

-- CreateIndex
CREATE INDEX "LenderBranch_lenderId_idx" ON "LenderBranch"("lenderId");

-- CreateIndex
CREATE UNIQUE INDEX "LenderBranch_lenderId_branchCode_key" ON "LenderBranch"("lenderId", "branchCode");

-- CreateIndex
CREATE UNIQUE INDEX "Warehouse_warehouseCode_key" ON "Warehouse"("warehouseCode");

-- CreateIndex
CREATE INDEX "WarehousePincodeMapping_warehouseId_idx" ON "WarehousePincodeMapping"("warehouseId");

-- CreateIndex
CREATE INDEX "WarehousePincodeMapping_mappingPincode_idx" ON "WarehousePincodeMapping"("mappingPincode");

-- CreateIndex
CREATE UNIQUE INDEX "WarehousePincodeMapping_warehouseId_mappingPincode_key" ON "WarehousePincodeMapping"("warehouseId", "mappingPincode");

-- CreateIndex
CREATE UNIQUE INDEX "Aggregator_aggregatorCode_key" ON "Aggregator"("aggregatorCode");

-- CreateIndex
CREATE UNIQUE INDEX "FieldEngineer_engineerCode_key" ON "FieldEngineer"("engineerCode");

-- CreateIndex
CREATE INDEX "FieldEngineer_aggregatorId_idx" ON "FieldEngineer"("aggregatorId");

-- CreateIndex
CREATE INDEX "FieldEngineer_engineerCode_idx" ON "FieldEngineer"("engineerCode");

-- CreateIndex
CREATE INDEX "FieldEngineer_mobileNo_idx" ON "FieldEngineer"("mobileNo");

-- CreateIndex
CREATE INDEX "DeviceMovement_deviceId_idx" ON "DeviceMovement"("deviceId");

-- CreateIndex
CREATE INDEX "DeviceMovement_movementType_idx" ON "DeviceMovement"("movementType");

-- CreateIndex
CREATE INDEX "DeviceMovement_movementStatus_idx" ON "DeviceMovement"("movementStatus");

-- CreateIndex
CREATE INDEX "DeviceMovement_fromEntityType_fromEntityId_idx" ON "DeviceMovement"("fromEntityType", "fromEntityId");

-- CreateIndex
CREATE INDEX "DeviceMovement_toEntityType_toEntityId_idx" ON "DeviceMovement"("toEntityType", "toEntityId");

-- CreateIndex
CREATE UNIQUE INDEX "InstallationRequisition_requisitionNo_key" ON "InstallationRequisition"("requisitionNo");

-- CreateIndex
CREATE INDEX "InstallationRequisition_lenderId_idx" ON "InstallationRequisition"("lenderId");

-- CreateIndex
CREATE INDEX "InstallationRequisition_branchId_idx" ON "InstallationRequisition"("branchId");

-- CreateIndex
CREATE INDEX "InstallationRequisition_assignedAggregatorId_idx" ON "InstallationRequisition"("assignedAggregatorId");

-- CreateIndex
CREATE INDEX "InstallationRequisition_assignedEngineerId_idx" ON "InstallationRequisition"("assignedEngineerId");

-- CreateIndex
CREATE INDEX "InstallationRequisition_status_idx" ON "InstallationRequisition"("status");

-- CreateIndex
CREATE INDEX "InstallationRequisition_vehicleNo_idx" ON "InstallationRequisition"("vehicleNo");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_fieldEngineerId_key" ON "User"("fieldEngineerId");

-- AddForeignKey
ALTER TABLE "LenderBranch" ADD CONSTRAINT "LenderBranch_lenderId_fkey" FOREIGN KEY ("lenderId") REFERENCES "Lender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warehouse" ADD CONSTRAINT "Warehouse_aggregatorId_fkey" FOREIGN KEY ("aggregatorId") REFERENCES "Aggregator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarehousePincodeMapping" ADD CONSTRAINT "WarehousePincodeMapping_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldEngineer" ADD CONSTRAINT "FieldEngineer_aggregatorId_fkey" FOREIGN KEY ("aggregatorId") REFERENCES "Aggregator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstallationRequisition" ADD CONSTRAINT "InstallationRequisition_lenderId_fkey" FOREIGN KEY ("lenderId") REFERENCES "Lender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstallationRequisition" ADD CONSTRAINT "InstallationRequisition_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "LenderBranch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstallationRequisition" ADD CONSTRAINT "InstallationRequisition_assignedAggregatorId_fkey" FOREIGN KEY ("assignedAggregatorId") REFERENCES "Aggregator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstallationRequisition" ADD CONSTRAINT "InstallationRequisition_assignedEngineerId_fkey" FOREIGN KEY ("assignedEngineerId") REFERENCES "FieldEngineer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_aggregatorId_fkey" FOREIGN KEY ("aggregatorId") REFERENCES "Aggregator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_lenderId_fkey" FOREIGN KEY ("lenderId") REFERENCES "Lender"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_fieldEngineerId_fkey" FOREIGN KEY ("fieldEngineerId") REFERENCES "FieldEngineer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

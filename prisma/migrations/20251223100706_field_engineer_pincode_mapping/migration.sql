/*
  Warnings:

  - Changed the type of `fromEntityId` on the `DeviceMovement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "DeviceMovement" DROP COLUMN "fromEntityId",
ADD COLUMN     "fromEntityId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "FieldEngineerPincodeMapping" (
    "id" UUID NOT NULL,
    "fieldEngineerId" UUID NOT NULL,
    "mappingPincode" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FieldEngineerPincodeMapping_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FieldEngineerPincodeMapping_fieldEngineerId_idx" ON "FieldEngineerPincodeMapping"("fieldEngineerId");

-- CreateIndex
CREATE INDEX "FieldEngineerPincodeMapping_mappingPincode_idx" ON "FieldEngineerPincodeMapping"("mappingPincode");

-- CreateIndex
CREATE UNIQUE INDEX "FieldEngineerPincodeMapping_fieldEngineerId_mappingPincode_key" ON "FieldEngineerPincodeMapping"("fieldEngineerId", "mappingPincode");

-- CreateIndex
CREATE INDEX "DeviceMovement_fromEntityType_fromEntityId_idx" ON "DeviceMovement"("fromEntityType", "fromEntityId");

-- AddForeignKey
ALTER TABLE "FieldEngineerPincodeMapping" ADD CONSTRAINT "FieldEngineerPincodeMapping_fieldEngineerId_fkey" FOREIGN KEY ("fieldEngineerId") REFERENCES "FieldEngineer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

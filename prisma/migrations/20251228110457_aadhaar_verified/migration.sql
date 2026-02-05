/*
  Warnings:

  - The `aadhaarVerifiedBy` column on the `InstallationRequisition` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `requestedBy` on the `InstallationRequisition` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "InstallationRequisition" DROP COLUMN "requestedBy",
ADD COLUMN     "requestedBy" UUID NOT NULL,
DROP COLUMN "aadhaarVerifiedBy",
ADD COLUMN     "aadhaarVerifiedBy" UUID;

-- AddForeignKey
ALTER TABLE "InstallationRequisition" ADD CONSTRAINT "InstallationRequisition_requestedBy_fkey" FOREIGN KEY ("requestedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstallationRequisition" ADD CONSTRAINT "InstallationRequisition_aadhaarVerifiedBy_fkey" FOREIGN KEY ("aadhaarVerifiedBy") REFERENCES "FieldEngineer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

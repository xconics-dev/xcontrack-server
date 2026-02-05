/*
  Warnings:

  - The `checklistVerifiedBy` column on the `InstallationRequisition` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `pincode` to the `InstallationRequisition` table without a default value. This is not possible if the table is not empty.
  - Made the column `assignedEngineerId` on table `InstallationRequisitionRequest` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "InstallationRequisitionRequest" DROP CONSTRAINT "InstallationRequisitionRequest_assignedEngineerId_fkey";

-- AlterTable
ALTER TABLE "InstallationRequisition" ADD COLUMN     "pincode" TEXT NOT NULL,
DROP COLUMN "checklistVerifiedBy",
ADD COLUMN     "checklistVerifiedBy" UUID;

-- AlterTable
ALTER TABLE "InstallationRequisitionRequest" ALTER COLUMN "assignedEngineerId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "InstallationRequisition" ADD CONSTRAINT "InstallationRequisition_checklistVerifiedBy_fkey" FOREIGN KEY ("checklistVerifiedBy") REFERENCES "FieldEngineer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstallationRequisitionRequest" ADD CONSTRAINT "InstallationRequisitionRequest_assignedEngineerId_fkey" FOREIGN KEY ("assignedEngineerId") REFERENCES "FieldEngineer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

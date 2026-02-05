-- DropForeignKey
ALTER TABLE "InstallationRequisition" DROP CONSTRAINT "InstallationRequisition_requestedBy_fkey";

-- AlterTable
ALTER TABLE "InstallationRequisition" ALTER COLUMN "requestedBy" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "InstallationRequisition" ADD CONSTRAINT "InstallationRequisition_requestedBy_fkey" FOREIGN KEY ("requestedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

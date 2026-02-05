/*
  Warnings:

  - You are about to drop the column `createdBy` on the `DeviceMovement` table. All the data in the column will be lost.
  - You are about to drop the column `installationRequisitionId` on the `DeviceMovement` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `DeviceMovement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DeviceMovement" DROP COLUMN "createdBy",
DROP COLUMN "installationRequisitionId",
ADD COLUMN     "createdById" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "DeviceMovement" ADD CONSTRAINT "DeviceMovement_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "DeviceMovement" DROP CONSTRAINT "DeviceMovement_createdById_fkey";

-- AlterTable
ALTER TABLE "DeviceMovement" ALTER COLUMN "createdById" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "DeviceMovement" ADD CONSTRAINT "DeviceMovement_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

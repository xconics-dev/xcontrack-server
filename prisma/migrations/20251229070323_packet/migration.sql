/*
  Warnings:

  - You are about to drop the column `receivedAt` on the `DeviceTracking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DeviceTracking" DROP COLUMN "receivedAt",
ADD COLUMN     "cog" DOUBLE PRECISION,
ADD COLUMN     "csq" DOUBLE PRECISION,
ADD COLUMN     "hdop" DOUBLE PRECISION,
ADD COLUMN     "pdop" DOUBLE PRECISION,
ALTER COLUMN "ignitionStatus" DROP NOT NULL,
ALTER COLUMN "tamperStatus" DROP NOT NULL,
ALTER COLUMN "powerStatus" DROP NOT NULL,
ALTER COLUMN "dataSource" SET DEFAULT 'HTTP';

-- CreateTable
CREATE TABLE "Packet" (
    "id" UUID NOT NULL,
    "packet" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Packet_pkey" PRIMARY KEY ("id")
);

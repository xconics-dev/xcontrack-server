-- CreateEnum
CREATE TYPE "EngineerLoginStatus" AS ENUM ('LOGGED_IN', 'LOGGED_OFF');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "InstallationStatus" ADD VALUE 'PENDING';
ALTER TYPE "InstallationStatus" ADD VALUE 'ACCEPTED';

-- AlterTable
ALTER TABLE "FieldEngineer" ADD COLUMN     "LoginStatus" "EngineerLoginStatus" NOT NULL DEFAULT 'LOGGED_OFF';

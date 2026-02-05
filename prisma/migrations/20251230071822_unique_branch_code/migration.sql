/*
  Warnings:

  - A unique constraint covering the columns `[branchCode]` on the table `LenderBranch` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LenderBranch_branchCode_key" ON "LenderBranch"("branchCode");

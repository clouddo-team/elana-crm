/*
  Warnings:

  - You are about to alter the column `settlement` on the `deals` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `DateTime(0)`.

*/
-- AlterTable
ALTER TABLE `client` ADD COLUMN `emailedExpiredId` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `deals` MODIFY `settlement` DATETIME(0) NULL,
    MODIFY `status` VARCHAR(20) NULL;

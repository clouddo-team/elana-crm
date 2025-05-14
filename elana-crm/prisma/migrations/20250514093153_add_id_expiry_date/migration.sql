/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `client` table. All the data in the column will be lost.
  - You are about to drop the `deal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `deal` DROP FOREIGN KEY `deal_eurosys_id_fkey`;

-- AlterTable
ALTER TABLE `client` DROP COLUMN `updatedAt`,
    ADD COLUMN `id_expiry_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `deal`;

-- CreateTable
CREATE TABLE `deals` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `eurosys_id` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `settlement` VARCHAR(255) NOT NULL,
    `status` VARCHAR(10) NOT NULL,
    `order_type` VARCHAR(100) NOT NULL,
    `code` VARCHAR(100) NOT NULL,
    `currency` VARCHAR(10) NOT NULL,
    `number` INTEGER NOT NULL,
    `unit_price` DOUBLE NOT NULL,
    `total` DOUBLE NOT NULL,
    `platform` VARCHAR(50) NOT NULL,

    INDEX `Deals_eurosys_id_fkey`(`eurosys_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `deals` ADD CONSTRAINT `deals_eurosys_id_fkey` FOREIGN KEY (`eurosys_id`) REFERENCES `client`(`eurosys_id`) ON DELETE CASCADE ON UPDATE CASCADE;

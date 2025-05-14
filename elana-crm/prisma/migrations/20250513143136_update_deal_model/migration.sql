/*
  Warnings:

  - You are about to drop the `deals` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `deals` DROP FOREIGN KEY `deals_eurosys_id_fkey`;

-- DropTable
DROP TABLE `deals`;

-- CreateTable
CREATE TABLE `deal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `eurosys_id` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `settlement` DATETIME(3) NOT NULL,
    `status` ENUM('VALIDATED', 'NOT_VALIDATED') NOT NULL DEFAULT 'NOT_VALIDATED',
    `order_type` ENUM('BUY', 'SELL') NOT NULL,
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
ALTER TABLE `deal` ADD CONSTRAINT `deal_eurosys_id_fkey` FOREIGN KEY (`eurosys_id`) REFERENCES `client`(`eurosys_id`) ON DELETE CASCADE ON UPDATE CASCADE;

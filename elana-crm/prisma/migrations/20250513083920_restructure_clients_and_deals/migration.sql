/*
  Warnings:

  - The primary key for the `client` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date_joined` on the `client` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `client` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `client` table. All the data in the column will be lost.
  - You are about to drop the column `id_expiry_date` on the `client` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `client` table. All the data in the column will be lost.
  - The values [PENDING_PAYMENT] on the enum `client_status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `clientlog` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `counterpart_id` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `counterpart_name` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eurosys_id` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ic_city` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `representative` to the `client` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `clientlog` DROP FOREIGN KEY `ClientLog_clientId_fkey`;

-- AlterTable
ALTER TABLE `client` DROP PRIMARY KEY,
    DROP COLUMN `date_joined`,
    DROP COLUMN `first_name`,
    DROP COLUMN `id`,
    DROP COLUMN `id_expiry_date`,
    DROP COLUMN `last_name`,
    ADD COLUMN `address` VARCHAR(255) NOT NULL,
    ADD COLUMN `comment` TEXT NULL,
    ADD COLUMN `counterpart_id` VARCHAR(100) NOT NULL,
    ADD COLUMN `counterpart_name` VARCHAR(255) NOT NULL,
    ADD COLUMN `country` VARCHAR(100) NOT NULL,
    ADD COLUMN `eurosys_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `ic_city` VARCHAR(100) NOT NULL,
    ADD COLUMN `language` VARCHAR(50) NOT NULL,
    ADD COLUMN `name` VARCHAR(255) NOT NULL,
    ADD COLUMN `phone` VARCHAR(50) NOT NULL,
    ADD COLUMN `pro_retail` VARCHAR(50) NOT NULL DEFAULT 'retail',
    ADD COLUMN `registration_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `representative` VARCHAR(255) NOT NULL,
    ADD COLUMN `risk_profile` VARCHAR(10) NOT NULL DEFAULT 'no',
    ADD COLUMN `type` VARCHAR(20) NOT NULL DEFAULT 'individual',
    MODIFY `email` VARCHAR(255) NOT NULL,
    MODIFY `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    ADD PRIMARY KEY (`eurosys_id`);

-- DropTable
DROP TABLE `clientlog`;

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

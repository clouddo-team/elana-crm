-- AlterTable
ALTER TABLE `client` MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `country` VARCHAR(100) NOT NULL DEFAULT 'Bulgaria',
    MODIFY `ic_city` VARCHAR(100) NOT NULL DEFAULT 'Varna',
    MODIFY `language` VARCHAR(50) NOT NULL DEFAULT 'Bulgarian',
    MODIFY `representative` VARCHAR(255) NOT NULL DEFAULT 'Dimitar';

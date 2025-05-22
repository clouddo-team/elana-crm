-- CreateTable
CREATE TABLE `log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `log` TEXT NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `eurosys_id` INTEGER NOT NULL,

    INDEX `log_eurosys_id_fkey`(`eurosys_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `log` ADD CONSTRAINT `log_eurosys_id_fkey` FOREIGN KEY (`eurosys_id`) REFERENCES `client`(`eurosys_id`) ON DELETE CASCADE ON UPDATE CASCADE;

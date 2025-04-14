/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `receitas` DROP FOREIGN KEY `receitas_id_categorias_fkey`;

-- DropIndex
DROP INDEX `receitas_id_categorias_fkey` ON `receitas`;

-- DropTable
DROP TABLE `Category`;

-- CreateTable
CREATE TABLE `categorias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `categorias_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `receitas` ADD CONSTRAINT `receitas_id_categorias_fkey` FOREIGN KEY (`id_categorias`) REFERENCES `categorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

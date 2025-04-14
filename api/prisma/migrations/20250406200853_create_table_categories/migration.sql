/*
  Warnings:

  - Added the required column `id_categorias` to the `receitas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `receitas` ADD COLUMN `id_categorias` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `receitas` ADD CONSTRAINT `receitas_id_categorias_fkey` FOREIGN KEY (`id_categorias`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

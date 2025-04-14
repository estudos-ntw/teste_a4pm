/*
  Warnings:

  - You are about to drop the column `usuario_id` on the `receitas` table. All the data in the column will be lost.
  - Added the required column `id_usuarios` to the `receitas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `receitas` DROP FOREIGN KEY `receitas_usuario_id_fkey`;

-- DropIndex
DROP INDEX `receitas_usuario_id_fkey` ON `receitas`;

-- AlterTable
ALTER TABLE `receitas` DROP COLUMN `usuario_id`,
    ADD COLUMN `id_usuarios` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `receitas` ADD CONSTRAINT `receitas_id_usuarios_fkey` FOREIGN KEY (`id_usuarios`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - Added the required column `matchesId` to the `BattleAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BattleAccount` ADD COLUMN `matchesId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `QuickMatch` (
    `id` VARCHAR(191) NOT NULL,
    `battleAccountId` VARCHAR(191) NULL,
    `result` ENUM('WIN', 'LOSE', 'DRAW') NOT NULL,
    `role` ENUM('TANK', 'SUPPORT', 'DAMAGE') NOT NULL,
    `hero` ENUM('ANA', 'ASHE', 'BAPTISTE', 'BASTION', 'BRIGITTE', 'CASSIDY', 'DVA', 'DOOMFIST', 'ECHO', 'GENJI', 'HANZO', 'JUNKRAT', 'LUCIO', 'MEI', 'MERCY', 'MOIRA', 'ORISA', 'PHARAH', 'REAPER', 'REINHARDT', 'ROADHOG', 'SIGMA', 'SOLDIER', 'SOMBRA', 'SYMMETRA', 'TORBJORN', 'TRACER', 'WIDOWMAKER', 'WINSTON', 'WRECKING_BALL', 'ZARYA', 'ZENYATTA') NOT NULL,
    `mapType` ENUM('Assault', 'Escort', 'Control', 'Hybrid') NOT NULL,
    `map` ENUM('BLIZZARD_WORLD', 'BUSAN', 'DORADO', 'EICHENWALDE', 'HANAMURA', 'HAVANA', 'HOLLYWOOD', 'HORIZON_LUNAR_COLONY', 'ILLIOS', 'JUNKERTOWN', 'KINGS_ROW', 'LIJIANG_TOWER', 'NEPAL', 'NUMBANI', 'OASIS', 'PARIS', 'RIALTO', 'ROUTE_66', 'TEMPLE_OF_ANUBIS', 'VOLSKAYA', 'GIBRALTER') NOT NULL,
    `playedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

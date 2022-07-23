/*
  Warnings:

  - You are about to drop the `categoryOnDiscipline` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "categoryOnDiscipline" DROP CONSTRAINT "categoryOnDiscipline_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "categoryOnDiscipline" DROP CONSTRAINT "categoryOnDiscipline_disciplineId_fkey";

-- DropForeignKey
ALTER TABLE "tests" DROP CONSTRAINT "tests_categoryId_disciplineId_fkey";

-- DropTable
DROP TABLE "categoryOnDiscipline";

/*
  Warnings:

  - You are about to drop the column `disciplineId` on the `tests` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `tests` table. All the data in the column will be lost.
  - You are about to drop the `_DisciplinesToTeachers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `teacherDisciplineId` to the `tests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_DisciplinesToTeachers" DROP CONSTRAINT "_DisciplinesToTeachers_A_fkey";

-- DropForeignKey
ALTER TABLE "_DisciplinesToTeachers" DROP CONSTRAINT "_DisciplinesToTeachers_B_fkey";

-- DropForeignKey
ALTER TABLE "tests" DROP CONSTRAINT "tests_disciplineId_fkey";

-- DropForeignKey
ALTER TABLE "tests" DROP CONSTRAINT "tests_teacherId_fkey";

-- AlterTable
ALTER TABLE "tests" DROP COLUMN "disciplineId",
DROP COLUMN "teacherId",
ADD COLUMN     "teacherDisciplineId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_DisciplinesToTeachers";

-- CreateTable
CREATE TABLE "teachersDisciplines" (
    "id" SERIAL NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "disciplineId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "teachersDisciplines_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "teachersDisciplines" ADD CONSTRAINT "teachersDisciplines_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachersDisciplines" ADD CONSTRAINT "teachersDisciplines_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_teacherDisciplineId_fkey" FOREIGN KEY ("teacherDisciplineId") REFERENCES "teachersDisciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "categoryOnDiscipline" (
    "categoryId" INTEGER NOT NULL,
    "disciplineId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categoryOnDiscipline_pkey" PRIMARY KEY ("categoryId","disciplineId")
);

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_categoryId_disciplineId_fkey" FOREIGN KEY ("categoryId", "disciplineId") REFERENCES "categoryOnDiscipline"("categoryId", "disciplineId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categoryOnDiscipline" ADD CONSTRAINT "categoryOnDiscipline_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categoryOnDiscipline" ADD CONSTRAINT "categoryOnDiscipline_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

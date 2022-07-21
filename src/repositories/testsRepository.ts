import prisma from "../config/db.js";

import { TestInsertData } from "../interfaces/createData.js";

export const findCategoryById = async (id: number) => {
  const category = await prisma.categories.findFirst({
    where: {
      id,
    },
  });
  return category;
};

export const findTeacherDisciplineById = async (id: number) => {
  const teacherDiscipline = await prisma.teachersDisciplines.findFirst({
    where: {
      id,
    },
  });
  return teacherDiscipline;
};

export const insertTest = async (testData: TestInsertData) => {
  await prisma.tests.create({
    data: testData,
  });
};

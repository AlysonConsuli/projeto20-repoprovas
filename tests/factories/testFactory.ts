import { faker } from "@faker-js/faker";

import prisma from "../../src/config/db.js";
import { TestInsertData } from "../../src/interfaces/createData.js";

export const testBody = (
  name = "Test Name",
  pdfUrl = "https://www.google.com",
  categoryId = 1,
  teacherDisciplineId = 1
) => {
  return {
    name,
    pdfUrl,
    categoryId,
    teacherDisciplineId,
  };
};

export const createTest = async (testBody: TestInsertData) => {
  const { name, pdfUrl, categoryId, teacherDisciplineId } = testBody;
  const test = await prisma.tests.create({
    data: {
      name,
      pdfUrl,
      categoryId,
      teacherDisciplineId,
    },
  });

  return test;
};

export const invalidTest = (
  name = +faker.random.numeric(10),
  pdfUrl = +faker.random.numeric(10),
  categoryId = 1,
  teacherDisciplineId = 1
) => {
  return {
    name,
    pdfUrl,
    categoryId,
    teacherDisciplineId,
  };
};

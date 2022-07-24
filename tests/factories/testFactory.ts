import { faker } from "@faker-js/faker";

import prisma from "../../src/config/db.js";
import { TestInsertData } from "../../src/interfaces/createData.js";

export const testBody = (
  name = "Test Name",
  pdfUrl = "https://www.google.com",
  categoryId = 1,
  teacherId = 1,
  disciplineId = 1
) => {
  return {
    name,
    pdfUrl,
    categoryId,
    teacherId,
    disciplineId,
  };
};

export const createTest = async (testBody: TestInsertData) => {
  const { name, pdfUrl, categoryId, teacherId, disciplineId } = testBody;
  const test = await prisma.tests.create({
    data: {
      name,
      pdfUrl,
      categoryId,
      teacherId,
      disciplineId,
    },
  });

  return test;
};
